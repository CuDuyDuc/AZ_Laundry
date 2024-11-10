export const unreadNotificationsFunc=(notifications:any)=>{
    return notifications?.filter((n:any)=>{
        return n.isRead===false
    })
}