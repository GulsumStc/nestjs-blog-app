'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' :
                                            'id="xs-controllers-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' :
                                        'id="xs-injectables-links-module-AppModule-f5062fba3f75c66986f6b8b53765807c5c4568419b51c0409ba5603d5a23f495a547b63fd010ead7d153804ee19a09a4bbfc8bda175b0b6ee0d527da99b831ce"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' :
                                            'id="xs-controllers-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' :
                                        'id="xs-injectables-links-module-AuthModule-ca4e69e6ea8083cc1b404da2b0f6bb6594f7ae09c7191e291f1e3ef969efbce2adc6f24df45c10cfbd563dcb2678ba03b68557783b6c528d1cc85f99d854e127"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' :
                                            'id="xs-controllers-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' :
                                        'id="xs-injectables-links-module-PostsModule-20ab4d65016025739be2cc81ea8d473c66e8638fe47935a987f2aaccc7937479eb949c3415300f320926991b22ed4de49614812af3f2639b0399410c2868b224"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-bad81ab67da23eb30070aca207eef13c2a0f018997730010e9a5e39d1cdc3ef2ea95b7cef1aee493a67d6b62c36a808b459513f6a18b6814b88c0dc18556af79"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-bad81ab67da23eb30070aca207eef13c2a0f018997730010e9a5e39d1cdc3ef2ea95b7cef1aee493a67d6b62c36a808b459513f6a18b6814b88c0dc18556af79"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-bad81ab67da23eb30070aca207eef13c2a0f018997730010e9a5e39d1cdc3ef2ea95b7cef1aee493a67d6b62c36a808b459513f6a18b6814b88c0dc18556af79"' :
                                            'id="xs-controllers-links-module-UsersModule-bad81ab67da23eb30070aca207eef13c2a0f018997730010e9a5e39d1cdc3ef2ea95b7cef1aee493a67d6b62c36a808b459513f6a18b6814b88c0dc18556af79"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUsersDto.html" data-type="entity-link" >PatchUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersService.html" data-type="entity-link" >UsersService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});