module.exports = Object.freeze({
    //
    //  Actions
    //

    //  Generic action that can be used in different context:
    //      - Instance action
    //      - Instance panel action
    //      - Instance panel item action
    //  The action is not required to work in all contexts, it's just to group
    //  them in the config file. The context in which the action is used is
    //  defined in the page view definition.
    ACTION: 'action',

    //  Action to be used in the Content header.
    CONTENT_ACTION: 'content-action',

    //  Action to be used in the Content header when in a specific domain. When
    //  in the domain, these actions will be merged with CONTENT_ACTION (if any)
    //  in the order in which they are defined.
    CONTENT_DOMAIN_ACTION: 'content-domain-action',

    //  Action to be used in the Studio header.
    STUDIO_ACTION: 'studio-action',

    //  Action to be used in the Studio header when in a specific domain. When
    //  in the domain, these actions will be merge with STUDIO_ACTION (if any)
    //  in the order in which they are defined.
    STUDIO_DOMAIN_ACTION: 'studio-domain-action',

    //
    //  Specialized plugins.
    //

    //  Reserved for the search engine and should only be one defined. The
    //  application will use the last one found and ignore any others.
    SEARCH: 'search',

    //  Reserved for the session manager and should only be one defined. The
    //  application will use the last one found, and ignore any others.
    SESSION: 'session'
});
