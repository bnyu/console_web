// api server error code define

const ServerErrorCode = {
    PingMysql: 1000,
    OperateMysql: 1001,
    PingRedis: 1002,
    OperateRedis: 1003,
    DirtyData: 1004,
}

const BaseErrorCode = {
    WrongParam: 2000,
    UserNotfound: 2001,
    AddUsername: 2002,
    SetPassword: 2003,
    WrongPassword: 2004,
    UserDeleted: 2005,
    RoleNotfound: 2006,
    RoleNameDup: 2007,
    LoginExpired: 2008,
    NoPermit: 2009,
}

export default ({
    ServerErrorCode,
    BaseErrorCode
})
