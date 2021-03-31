import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, notification } from 'antd';

import API_ROUTES from "modules/constants/api_routes";
import APP_ROUTES from "modules/constants/routes";
import ApiCall, { logoutFE } from "modules/ApiCall";
import CONFIG from "web.config";
import { ITEM_TYPE_INDEX } from "modules/constants/items";
import { UserContext } from "./UserProvider";
import User from "modules/User";
// import EventDispatcher from "plugins/utils/EventDispatcher";

// TODO: show UI modal for success or failure
/**
 * ApiContext includes: 
 *  - authenticated state of user
 *  - information about the logged in user:
 *      + animals[],
 *      + current character,
 *      + items[] 
 *      + accessories[],
 *      + ...
 */

export const ApiContext = createContext();
// const refreshTokenListener = new EventDispatcher();


function ApiProvider({ children, ...props }) {

    const router = useRouter();


    const DELETE = async (options) => {
        options = options || {};
        options['url'] = options.hasOwnProperty('url') ? options['url'] : "";
        options['path'] = options.hasOwnProperty('path') ? options['path'] : "";
        options['isEncrypt'] = options.hasOwnProperty('isEncrypt') ? options['isEncrypt'] : true;
        options['data'] = options.hasOwnProperty('data') ? options['data'] : {};

        const res = await call({
            ...options,
            method: "DELETE"
        })
        return res;
    }

    /**
    * 
    * @param {Object} options 
    * @param {string} options.url
    * @param {string} options.path
    * @param {string} options.method
    * @param {Object} options.data
    * @param {string} options.token
    * @param {Number} options.contentType
    * @param {Object} options.headers
    * @param {Object} options.params
    * @param {boolean} options.isEncrypt
    */
    const PUT = async (options) => {
        options = options || {};
        options['url'] = options.hasOwnProperty('url') ? options['url'] : "";
        options['path'] = options.hasOwnProperty('path') ? options['path'] : "";
        options['isEncrypt'] = options.hasOwnProperty('isEncrypt') ? options['isEncrypt'] : true;
        options['data'] = options.hasOwnProperty('data') ? options['data'] : {};

        const res = await call({
            ...options,
            method: "PUT"
        })
        return res;

    }

    /**
    * 
    * @param {Object} options 
    * @param {string} options.url
    * @param {string} options.path
    * @param {string} options.method
    * @param {Object} options.data
    * @param {string} options.token
    * @param {Number} options.contentType
    * @param {Object} options.headers
    * @param {Object} options.params
    * @param {boolean} options.isEncrypt
    */
    const POST = async (options) => {
        options = options || {};
        options['url'] = options.hasOwnProperty('url') ? options['url'] : "";
        options['path'] = options.hasOwnProperty('path') ? options['path'] : "";
        options['isEncrypt'] = options.hasOwnProperty('isEncrypt') ? options['isEncrypt'] : true;
        options['data'] = options.hasOwnProperty('data') ? options['data'] : {};

        const res = await call({
            ...options,
            method: "POST"
        })

        return res;
    }



    /**
    * 
    * @param {Object} options 
    * @param {string} options.url
    * @param {string} options.path
    * @param {string} options.method
    * @param {Object} options.data
    * @param {string} options.token
    * @param {Number} options.contentType
    * @param {Object} options.headers
    * @param {Object} options.params
    * @param {boolean} options.isEncrypt
    */
    const GET = async (options) => {
        options = options || {};
        options['url'] = options.hasOwnProperty('url') ? options['url'] : "";
        options['path'] = options.hasOwnProperty('path') ? options['path'] : "";
        options['isEncrypt'] = options.hasOwnProperty('isEncrypt') ? options['isEncrypt'] : true;
        options['data'] = options.hasOwnProperty('data') ? options['data'] : {};

        const res = await call({
            ...options,
            method: "GET"
        })
        return res;
    }


    /**
     * 
     * @param {Object} options 
     * @param {string} options.url
     * @param {string} options.path
     * @param {string} options.method
     * @param {Object} options.data
     * @param {string} options.token
     * @param {Number} options.contentType
     * @param {Object} options.headers
     * @param {Object} options.params
     * @param {boolean} options.isEncrypt
     */
    const call = async (options) => {
        options = options || {};
        options['url'] = options.hasOwnProperty('url') ? options['url'] : "";
        options['path'] = options.hasOwnProperty('path') ? options['path'] : "";
        options['method'] = options.hasOwnProperty('method') ? options['method'] : "GET";
        options['data'] = options.hasOwnProperty('data') ? options['data'] : {};
        options['token'] = options.hasOwnProperty('token') ? options['token'] : (User.current ? User.current.token : null);
        options['contentType'] = options.hasOwnProperty('contentType') ? options['contentType'] : null;
        options['headers'] = options.hasOwnProperty('headers') ? options['headers'] : {};
        options['params'] = options.hasOwnProperty('params') ? options['params'] : {};
        options['isEncrypt'] = options.hasOwnProperty('isEncrypt') ? options['isEncrypt'] : false;

        const res = await ApiCall(options);

        if (res) {
            switch (res.statusCode) {
                case 401:
                case 402:
                case 403:
                    // openNotification();
                    // logoutFE();

                    // const __res = await refreshToken();
                    if (__res) {
                        const __data = __res.data || {};
                        options['token'] = __data.token || "";
                        return call(options);
                    }
                    break;

                    break;

                default:
                    break;
            }
        }

        return res;
    }

    const openNotification = (title = 'Token hết hạn!', description = 'Vui lòng đăng nhập lại!') => {
        notification.open({
            message: title,
            description: description,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };


    const refreshToken = () => {

        return new Promise(async (resolve, reject) => {
            if (refreshTokenListener.isCalling) {

                function onResponse(e) {
                    const response = e.response;
                    refreshTokenListener.removeEventListener("response", onResponse);
                    resolve(response);
                }
                refreshTokenListener.addEventListener("response", onResponse)

            } else {
                // const res = await onRefreshToken();
                resolve(res);
            }
        })


    };


    const onRefreshToken = async () => {
        // refreshTokenListener
        refreshTokenListener.isCalling = true;
        const response = await ApiCall({
            method: "PUT",
            url: CONFIG.path("/api/token"),
            isEncrypt: false,
        });


        if (response) {

            response.message = response.message || "{message}";
            // save to context's state:
            if (response.status) {
                await User.fetchLoggedInUser();
                // await setAndFetchUser(userData)
            }

            refreshTokenListener.isCalling = false;
            refreshTokenListener.dispatchEvent({ type: "response", response })

            return response;

        } else console.warn("[UserContext] cannot refresh token");

    }

    return (
        <ApiContext.Provider
            value={{
                call,
                POST,
                PUT,
                GET,
                DELETE
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}


export default ApiProvider;