import {createSelector} from 'reselect';

const Action = {
    OPEN_DATA_DIALOG: '[GLOBAL] OPEN DATA DIALOG',
    CLOSE_DATA_DIALOG: '[GLOBAL] CLOSE DATA DIALOG',
    OPEN_NEW_DATA_DIALOG: '[GLOBAL] OPEN NEW DATA DIALOG',
    CLOSE_NEW_DATA_DIALOG: '[GLOBAL] CLOSE NEW DATA DIALOG',
    OPEN_SECOND_DATA_DIALOG: '[GLOBAL] OPEN SECOND DATA DIALOG',
    CLOSE_SECOND_DATA_DIALOG: '[GLOBAL] CLOSE SECOND DATA DIALOG',
    OPEN_THIRD_DATA_DIALOG: '[GLOBAL] OPEN THIRD DATA DIALOG',
    CLOSE_THIRD_DATA_DIALOG: '[GLOBAL] CLOSE THIRD DATA DIALOG',
    OPEN_EDIT_DATA_DIALOG: '[GLOBAL] OPEN EDIT DATA DIALOG',
    CLOSE_EDIT_DATA_DIALOG: '[GLOBAL] CLOSE EDIT DATA DIALOG',
    OPEN_ALERT_DIALOG: '[GLOBAL] OPEN ALERT DIALOG',
    CLOSE_ALERT_DIALOG: '[GLOBAL] CLOSE ALERT DIALOG',
    OPEN_ERROR_DIALOG: '[GLOBAL] OPEN ERROR DIALOG',
    CLOSE_ERROR_DIALOG: '[GLOBAL] CLOSE ERROR DIALOG',
    OPEN_LOADING_MASK: '[GLOBAL] OPEN LOADING MASK',
    CLOSE_LOADING_MASK: '[GLOBAL] CLOSE LOADING MASK',
    SET_SEARCH_TEXT: '[GLOBAL] SET SEARCH TEXT',
    SET_SIDEBAR_SEARCH_TEXT: '[GLOBAL] SET SIDEBAR SEARCH TEXT',
    SELECT_ALL_CONTACTS: '[GLOBAL] SELECT ALL CONTACTS',
    DESELECT_ALL_CONTACTS: '[GLOBAL] DESELECT ALL CONTACTS',
    SELECT_ONE_CONTACTS: '[GLOBAL] SELECT ONE CONTACTS',
    DESELECT_ONE_CONTACTS: '[GLOBAL] DESELECT ONE CONTACTS',
    TOGGLE_IN_SELECTED_CONTACTS: '[GLOBAL] TOGGLE IN SELECTED CONTACTS',
};

const ActionCreator = {
    openDataDialog({type, name}) {
        return {type: Action.OPEN_DATA_DIALOG, data_dialog_type: type, data_dialog_name: name};
    },
    closeDataDialog({name}) {
        return {type: Action.CLOSE_DATA_DIALOG, data_dialog_name: name};
    },
    openNewDataDialog() {
        return {type: Action.OPEN_NEW_DATA_DIALOG};
    },
    closeNewDataDialog() {
        return {type: Action.CLOSE_NEW_DATA_DIALOG};
    },
    openSecondDataDialog() {
        return {type: Action.OPEN_SECOND_DATA_DIALOG};
    },
    closeSecondDataDialog() {
        return {type: Action.CLOSE_SECOND_DATA_DIALOG};
    },
    openThirdDataDialog() {
        return {type: Action.OPEN_THIRD_DATA_DIALOG};
    },
    closeThirdDataDialog() {
        return {type: Action.CLOSE_THIRD_DATA_DIALOG};
    },
    openEditDataDialog() {
        return {type: Action.OPEN_EDIT_DATA_DIALOG};
    },
    closeEditDataDialog() {
        return {type: Action.CLOSE_EDIT_DATA_DIALOG};
    },
    openAlertDialog(alertDialog) {
        return {type: Action.OPEN_ALERT_DIALOG, alertDialog};
    },
    closeAlertDialog() {
        return {type: Action.CLOSE_ALERT_DIALOG};
    },
    openErrorDialog({title, message}) {
        const errorDialog = {title, message};
        return {type: Action.OPEN_ERROR_DIALOG, errorDialog};
    },
    closeErrorDialog() {
        return {type: Action.CLOSE_ERROR_DIALOG};
    },
    openLoadingMask(loadingMask) {
        return {type: Action.OPEN_LOADING_MASK, loadingMask};
    },
    closeLoadingMask() {
        return async (dispatch, getState) => {
            const loadingMask = getState().loadingMask;
            dispatch({type: Action.OPEN_LOADING_MASK, loadingMask: {...loadingMask, is_success: true}});
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    dispatch({type: Action.CLOSE_LOADING_MASK});
                    resolve(true);
                }, 2000);
            });
        };
    },
    setSearchText(event) {
        return {type: Action.SET_SEARCH_TEXT, searchText: event.target.value};
    },
    setSidebarSearchText(event) {
        return {type: Action.SET_SIDEBAR_SEARCH_TEXT, sidebarSearchText: event.target.value};
    },
    selectAllContacts(entities) {
        return {type: Action.SELECT_ALL_CONTACTS, entities};
    },
    deSelectAllContacts() {
        return {type: Action.DESELECT_ALL_CONTACTS};
    },
    toggleInSelectedContact(contactId) {
        return (dispatch, getState) => {

            if (getState().global.selectedContactIds.includes(contactId)) {
                return dispatch({type: Action.DESELECT_ONE_CONTACTS, contactId});
            } else {
                return dispatch({type: Action.SELECT_ONE_CONTACTS, contactId});
            }
        };

    },
    toggleInSelectedContacts(contactIds) {

        return (dispatch) => {
            return contactIds.map((contactId) => {
                return dispatch(ActionCreator.toggleInSelectedContact(contactId));
            });
        };
    },
};

const stateGetter = {
    shopItemsSelector: state => state.shop.items,
    taxPercentSelector: state => state.shop.taxPercent
};

const combinedSelector = {
    subtotalSelector: createSelector(
        stateGetter.shopItemsSelector,
        items => items.reduce((acc, item) => acc + item.value, 0)
    ),
    taxSelector: createSelector(
        [stateGetter.shopItemsSelector, stateGetter.taxPercentSelector],
        (subtotal, taxPercent) => subtotal * (taxPercent / 100)
    ),
    totalSelector: () => {
        return createSelector(
            [combinedSelector.subtotalSelector, combinedSelector.taxSelector],
            (subtotal, tax) => ({total: subtotal + tax})
        )
    },
};

const initialState = {
    searchText: 'initSearchText',
    sidebarSearchText: '',
    selectedContactIds: [],
    dataDialogs: {},
    dataDialog: {
        type: 'new',
        props: {
            open: false
        },
    },
    secondDataDialog: {
        props: {
            open: false
        },
    },
    thirdDataDialog: {
        props: {
            open: false
        },
    },
    alertDialog: {
        title: '',
        message: '',
        yesButton: {
            label: '',
            onClick: () => {
            },
        },
        noButton: {
            label: '',
            onClick: () => {
            },
        },
        props: {
            open: false
        },
    },
    errorDialog: {
        title: '',
        message: '',
        props: {
            open: false
        },
    },
    loadingMask: {
        onFinish: () => {
        },
        props: {
            open: false
        },
    }
};

const Reducer = function (state = initialState, action) {

    switch (action.type) {
        case Action.OPEN_DATA_DIALOG: {

            const newDataDialog = {
                name: action.data_dialog_name,
                type: action.data_dialog_type,
                props: {
                    open: true
                },
            };

            return {
                ...state,
                dataDialogs: {
                    ...state.dataDialogs,
                    [action.data_dialog_name]: newDataDialog
                }
            };
        }
        case Action.CLOSE_DATA_DIALOG: {

            const newDataDialog = {
                name: action.data_dialog_name,
                props: {
                    open: false
                },
            };

            return {
                ...state,
                dataDialogs: {
                    ...state.dataDialogs,
                    [action.data_dialog_name]: newDataDialog
                }
            };
        }
        case Action.OPEN_NEW_DATA_DIALOG: {
            return {
                ...state,
                dataDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                }
            };
        }
        case Action.CLOSE_NEW_DATA_DIALOG: {
            return {
                ...state,
                dataDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                }
            };
        }
        case Action.OPEN_EDIT_DATA_DIALOG: {
            return {
                ...state,
                dataDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                }
            };
        }
        case Action.CLOSE_EDIT_DATA_DIALOG: {
            return {
                ...state,
                dataDialog: {
                    type: 'edit',
                    props: {
                        open: false
                    },
                }
            };
        }
        case Action.OPEN_ALERT_DIALOG: {
            return {
                ...state,
                alertDialog: {
                    ...action.alertDialog,
                    props: {
                        open: true
                    },
                }
            };
        }
        case Action.CLOSE_ALERT_DIALOG: {
            return {
                ...state,
                alertDialog: {
                    ...state.alertDialog,
                    props: {
                        open: false
                    },
                }
            };
        }
        case Action.OPEN_ERROR_DIALOG: {
            return {
                ...state,
                errorDialog: {
                    ...action.errorDialog,
                    props: {
                        open: true
                    },
                }
            };
        }
        case Action.CLOSE_ERROR_DIALOG: {
            return {
                ...state,
                errorDialog: {
                    ...state.errorDialog,
                    props: {
                        open: false
                    },
                }
            };
        }
        case Action.OPEN_LOADING_MASK: {
            return {
                ...state,
                loadingMask: {
                    ...action.loadingMask,
                    props: {
                        open: true
                    },
                }
            };
        }
        case Action.CLOSE_LOADING_MASK: {
            return {
                ...state,
                loadingMask: {
                    ...state.loadingMask,
                    props: {
                        open: false
                    },
                }
            };
        }
        case Action.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Action.SET_SIDEBAR_SEARCH_TEXT: {
            return {
                ...state,
                sidebarSearchText: action.sidebarSearchText
            };
        }
        case Action.SELECT_ONE_CONTACTS: {

            return {
                ...state,
                selectedContactIds: [...state.selectedContactIds, action.contactId]
            };
        }
        case Action.DESELECT_ONE_CONTACTS: {
            return {
                ...state,
                selectedContactIds: [...state.selectedContactIds].filter(id => id !== action.contactId)
            };
        }
        case Action.SELECT_ALL_CONTACTS: {
            return {
                ...state,
                selectedContactIds: action.entities.map(contact => contact.id)
            };
        }
        case Action.DESELECT_ALL_CONTACTS: {
            return {
                ...state,
                selectedContactIds: []
            };
        }
        default: {
            return state;
        }
    }
};

export default {Action, ActionCreator, Reducer};

let exampleState = {
    shop: {
        taxPercent: 8,
        items: [
            {name: 'apple', value: 1.20},
            {name: 'orange', value: 0.95},
        ]
    }
};

console.log(combinedSelector.subtotalSelector(exampleState)); // 2.15
console.log(combinedSelector.taxSelector(exampleState));    // 0.172
console.log(combinedSelector.totalSelector(exampleState));   // { total: 2.322 }
