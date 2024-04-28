class AdminModel {
    constructor(data) {
        this.accessToken = data.access_token;
        this.adminID = data.adminID;
        this.adminName = data.adminName;
        this.createdDate = data.created_date;
        this.email = data.email;
        this.fullName = data.fullName;
        this.image = data.image;
        this.modifiedDate = data.modified_date;
        this.refreshToken = data.refresh_token;
    }

    // Phương thức tạo một đối tượng Admin từ dữ liệu API trả về
    static fromApiResponse(data) {
        return new AdminModel({
            access_token: data.access_token,
            adminID: data.adminID,
            adminName: data.adminName,
            created_date: data.created_date,
            email: data.email,
            fullName: data.fullName,
            image: data.image,
            modified_date: data.modified_date,
            refresh_token: data.refresh_token
        });
    }
}

export default AdminModel