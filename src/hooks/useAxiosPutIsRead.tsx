import messageAPI from "../apis/messageAPI";


export const useAxiosPutIsRead=async(chat:any)=>{
    try {
        const res = await messageAPI.HandleMessage(`/update-count-isread/${chat._id}`,{},'put')
        if(res){
            console.log('update isRead thành công')
        }
    } catch (error) {
        console.error("update isRead lỗi: ", error);
    }
}