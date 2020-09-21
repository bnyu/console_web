import elementCnLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang

export default {
  ...elementCnLocale,
  app: {
    title: "控制台",
    menu: {
      dashboard: "总览",
      userRegister: "用户注册",
      userManage: "用户管理",
      userList: "用户列表",
      userAdd: "添加用户",
      userEdit: "用户编辑",
      roleManage: "角色管理",
      roleList: "角色列表",
      roleAdd: "添加角色",
      roleEdit: "角色编辑",
      changePassword: "修改密码",
    },
    act: {
      operation: "操作",
      loading: "加载中",
      failed: "操作成功",
      success: "操作失败",
      back: "返回",
      confirm: "确认",
      cancel: "取消",
      delete: "删除",
      edit: "编辑",
      preview: "预览",
      view: "浏览",
      refresh: "刷新",
      addNew: "新增",
      search: "搜索",
      save: "保存",
      next: "下一步",
      reset: "重置",
      clear: "清除",
    },
    user: {
      login: "登录",
      logout: "退出登录",
      register: "注册",
      password: "密码",
      newPassword: "新密码",
      changePassword: "修改密码",
      username: "用户名",
      manage: "系统管理",
      info: "个人中心",
      roleList: "角色列表",
      roleName: "角色名称",
      permitList: "权限列表",
    },
    notice: {
      actCanNotUndo: "此操作不可撤销",
      wrongPassword: "用户名或密码错误",
      networkError: "网络出错了",
      serverError: "服务器发生错误",
      someError: "发生了一些错误",
      saveSuccess: "保存成功",
      userDeleted: "该用户已被删除",
      inputUsername: "请输入用户名",
      inputPassword: "请输入密码",
      inputOldPassword: "请输入旧密码",
      inputNewPassword: "请输入新密码",
      passwordNotChange: "新密码不能和旧密码相同",
      passwordIllegal: "密码长度需要在6到64",
      repeatNewPassword: "请重复输入新密码",
      newPasswordNotSame: "两次输入新密码不一致",
      changePasswordSuccess: "修改密码成功",
      addNewUser: "添加新用户",
      addNewUserSuccess: "添加新用户成功",
      addNewRole: "添加新角色",
      addNewRoleSuccess: "添加新角色成功",
      inputRoleName: "请输入角色名",
      roleAlreadyExist: "此角色已存在",
      selectPermits: "请选择权限",
      deleteUserSuccess: "删除用户成功",
      deleteRoleSuccess: "删除角色成功",
      userAlreadyExist: "该用户名已存在",
      userAlreadyDelete: "此用户已被删除",
      userNotExist: "用户不存在",
      roleNotExist: "角色不存在",
      loginExpired: "登录超时",
    },
    username: "用户名",
    password: "密码",
    err404: "抱歉, 访问错误",
  },
};
