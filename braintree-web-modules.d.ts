// braintree-web ships types for the main entry but not for the deep submodule
// paths we import for smaller bundles. Declare them as untyped modules.
declare module 'braintree-web/client'
declare module 'braintree-web/us-bank-account'
declare module 'braintree-web/data-collector'
