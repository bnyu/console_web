import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang

export default {
    ...elementEnLocale,
    app: {
        title: 'Console Web',
        menu: {
            pm: 'Product Manage',
            dev: 'Development',
            ops: 'Operations',
            dashboard: 'Dashboard',
            userRegister: 'User Register',
            userManage: 'User Manage',
            roleManage: 'Role Manage',

            bulletin: 'Bulletin',
            bulletinPost: 'Post New',
            bulletinList: 'View List',
            server: 'Game Server',
            serverList: 'Server List',
            email: 'System Email',
            config: 'Arg Config',
            configVersion: 'Version',
            configFunction: 'Functions',
            configAddress: 'URL Address',
            ecology: 'Ecology'
        },
        act: {
            operation: 'Operation',
            back: 'Back',
            confirm: 'Confirm',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
            refresh: 'Refresh',
            addNew: 'Add New',
            search: 'Search',
            searchOrAdd: 'Search Or Add',
            save: 'Save',
        },
        user: {
            login: 'Login',
            logout: 'Logout',
            register: 'Register',
            changePassword: 'Change Password',
            username: 'Username',
            roleList: 'Role List',
            roleName: 'Role Name',
            permitList: 'Permit List',
        },
        notice: {
            wrongPassword: 'Username or Password wrong',
            networkError: 'Network Error',
            serverError: 'Server Error',
            someError: 'Some Error Occur',
            userDeleted: 'This user is deleted',
            inputUsername: 'Please input username',
            inputPassword: 'Please input password'
        },
        permit: {
            config_address: "config address",
            config_function: "config function",
            config_version: "config version",
            ecology: "ecology",
            post_bulletin: "post bulletin",
            send_email: "send email",
            view_bulletin: "view bulletin",
            view_server_list: "view server list"
        },
        username: 'Username',
        password: 'Password',
        err404: 'Sorry, nothing here',
        failed: 'Action failed',
        success: 'Action success'
    }
}
