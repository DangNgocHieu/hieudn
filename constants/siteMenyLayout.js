export const SIDEBAR_MENUS_MERGE = (isAuth = false) => {
    return [
        {
            menu_key: "home",
            isProduction: true,
            icon: homeIcon,
            subItems: [
                {
                    menu_key: "dashboard",
                    link: "/dashboard/",
                },
            ],
            width: 16,
            height: 15,
        },
        {
            menu_key: "kyc",
            isProduction: true,
            icon: iconEkycWhite,
            subItems: [
                {
                    menu_key: "kyc_transaction",
                    link: "/ekyc/ekyc-transaction/",
                },
                {
                    menu_key: "document_accept",
                    link: "/none/",
                },
                {
                    menu_key: "live_view",
                    link: "/ekyc/manage-live-stream/",
                },
            ],
            height: 15,
            width: 15,
        },
        {
            menu_key: "account",
            isProduction: true,
            icon: accountIcon,
            subItems: [
                {
                    menu_key: "user_account",
                    link: isAuth ? "/account/user/" : "/account/operator/",
                },
                {
                    menu_key: "mt4_5_accounts",
                    link: "/account/mt-account/",
                },
            ],
            width: 14,
            height: 14,
        },
        {
            menu_key: "payment",
            isProduction: true,
            icon: paymentIcon,
            subItems: [
                {
                    menu_key: "payment_transaction",
                    link: "/payment/transaction/",
                },
                {
                    menu_key: "api_history",
                    link: null,
                    subItems: [
                        {
                            menu_key: "local_bank_api_1",
                            link: "/payment/history/local-bank-api/",
                        },
                        {
                            menu_key: "local_bank_api_2",
                            link: "/payment/history/local-bank-api-2/",
                        },
                        {
                            menu_key: "credit_card_api_1",
                            link: "/payment/history/credit-card-api/",
                        },
                        {
                            menu_key: "paypay_bank_api",
                            isProduction: true,
                            link: "/payment/history/pay-pay-bank-api/",
                        },
                    ],
                },
                {
                    menu_key: "settings_rule",
                    link: null,
                    subItems: [
                        {
                            menu_key: "range_of_use",
                            link: "/payment/setting-rule/range-of-use/",
                        },
                        {
                            menu_key: "api_advanced_settings",
                            link: "/payment/setting-rule/api-advanced-setting/?tab=1",
                        },
                    ],
                },
            ],
            width: 14,
            height: 14,
        },
        {
            menu_key: "statistics",
            isProduction: true,
            icon: ibStatisticsIcon,
            subItems: [
                {
                    menu_key: "account_records",
                    link: "/none/",
                },
                {
                    menu_key: "tradingvolume_records",
                    link: "/none/",
                },
                {
                    menu_key: "payment_records",
                    link: "/none/",
                },
                {
                    menu_key: "introduction_records",
                    link: null,
                    subItems: [
                        {
                            menu_key: "statistics_user_accounts",
                            link: "/statistics/introduction-records/users_accounts/",
                        },
                        {
                            menu_key: "rebates",
                            link: null,
                            subItems: [
                                {
                                    menu_key: "forex",
                                    link: "/statistics/introduction_records/rebates/",
                                    bread_crumb: "Rebate Forex",
                                    type: "FX",
                                },
                                {
                                    menu_key: "cfd",
                                    link: "/statistics/introduction_records/rebates/",
                                    bread_crumb: "Rebate CFD",
                                    type: "CFD",
                                },
                                {
                                    menu_key: "rebate_other",
                                    link: "/statistics/introduction_records/rebate_other/",
                                    bread_crumb: "Rebates-other",
                                    type: "other",
                                },
                            ],
                        },
                    ],
                },
            ],
            height: 16,
            width: 16,
        },
        {
            menu_key: "ib_activity",
            isProduction: true,
            icon: ibActivityIcon,
            subItems: [
                {
                    menu_key: "induced_traders",
                    link: "/ib_activity/induced_trader/",
                },
                {
                    menu_key: "rebate_history",
                    link: "/ib_activity/rebate_history/",
                },
            ],
            height: 14,
            width: 14,
        },
        {
            menu_key: "configurations",
            isProduction: true,
            icon: configIcon,
            subItems: [
                {
                    menu_key: "mt_server_master",
                    link: "/configuration/trading-server/",
                },
                {
                    menu_key: "site_link_master",
                    isProduction: true,
                    link: "/configuration/site-link-master/",
                },
                {
                    menu_key: "symbol_link_master",
                    isProduction: true,
                    link: "/configuration/symbol-link-master/",
                },
                {
                    menu_key: "broker_link_master",
                    isProduction: true,
                    link: "/configuration/brokers-link-master/",
                },
                {
                    menu_key: "cb_link_master",
                    isProduction: true,
                    link: null,
                    subItems: [
                        {
                            menu_key: "rebates_master",
                            link: "/configuration/cb_link_master/rebates_master/",
                        },
                    ],
                },
                {
                    menu_key: "fcrm_system_master",
                    link: "/configuration/fcrm-system-master/",
                },
            ],
            height: 14,
            width: 14,
        },
        {
            menu_key: "settings",
            isProduction: true,
            icon: settingIconWhite,
            subItems: [
                {
                    menu_key: "manage_accounts",
                    link: "/setting/manage-account/",
                },
                {
                    menu_key: "permission_settings",
                    link: "/setting/permission-setting/",
                },
            ],
            height: 15,
            width: 15,
        },
        {
            menu_key: "language",
            isProduction: true,
            icon: languageIconcWhite,
            subItems: [
                {
                    menu_key: "language_parameters",
                    link: "/language/",
                },
            ],
            height: 14,
            width: 15,
        },
    ];
};