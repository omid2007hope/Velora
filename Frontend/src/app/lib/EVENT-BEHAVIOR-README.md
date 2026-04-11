# Event Behavior Readme

This file explains the auth and popup events connected to the frontend storage flow.

## Purpose

The app now keeps customer and seller auth in separate local storage entries:

- `user` for customers
- `storeOwner` for sellers

The UI does not only depend on local storage itself. It also depends on events that tell components when they should re-check storage and refresh what is shown on screen.

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

Who reacts to it:

- Header
- AccountShell
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- customer account UI refreshes
- signed-in customer state is re-read from local storage

### `storeOwner-updated`

What it means:

- the stored seller changed

When it happens:

- after saving a seller as `storeOwner`
- after clearing the seller entry during sign-out

Who reacts to it:

- Header
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- seller-related visibility refreshes
- account page restrictions can update

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

## Connection Map

### Customer Sign-In Flow

1. customer signs in
2. customer data is saved as `user`
3. `user-updated` is sent
4. Header and account-related UI re-read auth state
5. customer account UI becomes available
6. seller panel should be hidden for that signed-in customer

### Seller Sign-In Flow

1. seller signs in
2. seller data is saved as `storeOwner`
3. `storeOwner-updated` is sent
4. Header and route guard re-read auth state
5. seller state becomes active in the UI
6. customer account page should be hidden or blocked for that seller

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

### AccountShell

The AccountShell is responsible for:

- showing customer account information
- refreshing customer information when customer auth changes

### AccountAccessGuard

The AccountAccessGuard is responsible for:

- checking whether `/account` should render
- allowing the page for a customer
- blocking or redirecting a seller from the customer account area

## Important Mental Model

Use this simple rule:

- local storage holds the auth data
- events tell the UI that the auth data changed
- components hear the event and then re-read storage

Short version:

- `user-updated` means customer changed
- `storeOwner-updated` means seller changed
- `storage` means another tab changed auth
- `open-login-popup` means open customer login
- `open-sellerPanel-popup` means open seller login

## Project Rule

Whenever customer auth changes, the customer update path must stay in sync.

Whenever seller auth changes, the seller update path must stay in sync.

The goal is simple:

- storage changes
- the correct event is fired
- the correct UI updates
