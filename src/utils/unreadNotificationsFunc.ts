export const unreadNotificationsFunc=(notifications:any)=>{
    return notifications.filter((n:any)=>n.isRead===false)
}