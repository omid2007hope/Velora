# Event Behavior Readme

This file explains the auth and popup events connected to the frontend storage flow.

## Purpose

The app now keeps customer and seller auth in separate local storage entries:

- `user` for customers
- `storeOwner` for sellers

The UI does not only depend on local storage itself. It also depends on events that tell components when they should re-check storage and refresh what is shown on screen.

The current implementation also makes customer and seller auth flows use their own backend endpoints while keeping the frontend auth state synchronized through events.

## Main Event Groups

There are three event groups in this area:

- storage update events
- popup open events
- route and state change triggers

## Storage Update Events

### `user-updated`

What it means:

- the stored customer changed

When it happens:

- after saving a customer as `user`
- after clearing the customer entry during sign-out
- after seller login removes the old customer entry during a role switch

Who reacts to it:

- Header
- AccountShell
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- customer account UI refreshes
- signed-in customer state is re-read from local storage
- customer-only screens can close or redirect if the customer session was removed

### `storeOwner-updated`

What it means:

- the stored seller changed

When it happens:

- after saving a seller as `storeOwner`
- after clearing the seller entry during sign-out
- after customer login removes the old seller entry during a role switch

Who reacts to it:

- Header
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- seller-related visibility refreshes
- account page restrictions can update
- seller-only UI does not stay stale after switching back to a customer account

### `storage`

What it means:

- local storage changed in another browser tab or window

When it matters:

- when the changed key is `user`
- when the changed key is `storeOwner`

Who reacts to it:

- `subscribeToStorageChanges`
- then the components using that helper

Visible result:

- another open tab can update its auth UI automatically

## Popup Open Events

### `open-login-popup`

What it means:

- open the customer sign-in popup

Who can send it:

- any part of the app that wants to trigger customer login

Who reacts to it:

- Header
- LoginPopup

Visible result:

- the customer login modal opens

### `open-sellerPanel-popup`

What it means:

- open the seller sign-in popup

Who can send it:

- any part of the app that wants to trigger seller login

Who reacts to it:

- Header
- LogIntoSellerPanelPopup

Visible result:

- the seller login modal opens

## Route and Query Triggers

### `?auth=login`

What it means:

- the page should open the customer login popup after navigation

Who creates it:

- `AccountAccessGuard` when someone visits `/account` without a signed-in customer

Who reacts to it:

- Header

Visible result:

- the app returns to home
- the customer login popup opens automatically

## Connection Map

### Customer Sign-In Flow

1. customer signs in
2. any existing seller entry is removed from local storage
3. `storeOwner-updated` is sent so seller listeners refresh too
4. customer data is saved as `user`
5. `user-updated` is sent
6. Header and account-related UI re-read auth state
7. customer account UI becomes available
8. seller panel should be hidden for that signed-in customer

### Seller Sign-In Flow

1. seller signs in
2. seller login uses the seller endpoint, not the customer endpoint
3. any existing customer entry is removed from local storage
4. `user-updated` is sent so customer listeners refresh too
5. seller data is saved as `storeOwner`
6. `storeOwner-updated` is sent
7. Header and route guard re-read auth state
8. seller state becomes active in the UI
9. customer account page should be hidden or blocked for that seller

### Seller Sign-Up Flow

1. seller signs up
2. seller signup uses the seller register endpoint
3. seller email verification is sent through seller verification routes
4. when the seller opens the verification link, the seller confirmation page uses the seller confirm endpoint

### Password Reset Flow

1. the popup sends a reset request based on auth view
2. customer reset uses customer reset routes
3. seller reset uses seller reset routes
4. when the reset link is opened, the confirmation page uses the matching customer or seller confirm endpoint

### Sign-Out Flow

1. auth session is cleared
2. `user` and `storeOwner` are removed
3. both storage update events are sent
4. auth-aware UI returns to signed-out state

### Cross-Tab Flow

1. auth changes in one browser tab
2. the browser sends `storage` to the other tab
3. the other tab re-reads auth storage
4. the UI updates there too

## Screen Responsibilities

### Header

The Header is responsible for:

- showing or hiding the seller panel entry
- showing or hiding the customer account link
- refreshing its auth state when auth events happen
- opening the login popup when the URL contains `?auth=login`

### AccountShell

The AccountShell is responsible for:

- showing customer account information
- refreshing customer information when customer auth changes

### AccountAccessGuard

The AccountAccessGuard is responsible for:

- checking whether `/account` should render
- allowing the page for a customer
- blocking or redirecting a seller from the customer account area
- redirecting a signed-out visitor away from `/account`
- sending the user to home with `?auth=login` so the login popup opens instead of leaving a blank page

## Important Mental Model

Use this simple rule:

- local storage holds the auth data
- events tell the UI that the auth data changed
- components hear the event and then re-read storage
- role switches must notify both sides if one role is removed and the other role is added

Short version:

- `user-updated` means customer changed
- `storeOwner-updated` means seller changed
- `storage` means another tab changed auth
- `open-login-popup` means open customer login
- `open-sellerPanel-popup` means open seller login
- `?auth=login` means return home and open the customer login popup

## Project Rule

Whenever customer auth changes, the customer update path must stay in sync.

Whenever seller auth changes, the seller update path must stay in sync.

Whenever a role switch removes the other role from storage, the matching update event must also be sent.

The goal is simple:

- storage changes
- the correct event is fired
- the correct UI updates
- the correct customer or seller backend route is used
