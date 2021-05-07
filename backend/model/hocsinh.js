const db = require('../utils/db');
module.exports = {
    signup: async(hocSinh)=>{
        const sql=`INSERT INTO HocSinh(Ten,NgaySinh,TenDangNhap,MatKhau) VALUES ("${hocSinh.Ten}","${hocSinh.NgaySinh}","${hocSinh.TenDangNhap}","${hocSinh.MatKhau}")`;
        const signup = await db.load(sql);
        return signup;
    },
    checkTenDangNhap: async(TenDangNhap)=>{
        const sql=`Select* from HocSinh where TenDangNhap = "${TenDangNhap}"`;
        const signup = await db.load(sql);
        return signup;
    },
    checkPassword: async(TenDangNhap)=>{
        const sql=`Select MatKhau from HocSinh where TenDangNhap = "${TenDangNhap}"`;
        return await db.load(sql);
    }
};