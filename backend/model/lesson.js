const db = require('../utils/db');
module.exports = {
    LayDSBG: async (TenDangNhap) => {
        const sql = `select b.MaBaiGiang, b.Ten, b.Mota,c.Ten as TenGiaoVien from HocSinhBaiGiang as a, BaiGiang as b, GiaoVien as c, HocSinh as d where d.TenDangNhap = '${TenDangNhap}' and a.MaHocSinh = d.MaHocSinh and a.MaBaiGiang = b.MaBaiGiang and b.MaGiaoVien = c.MaGiaoVien;`;
        const isExisted = await db.load(sql);
        return isExisted;
    },
    checkBaiGiang: async(MaBaiGiang)=>{
        const sql=`select* from BaiGiang where MaBaiGiang = ${MaBaiGiang}`;
        return await db.load(sql);
    },
    checkExistsed: async(TenDangNhap,MaBaiGiang)=>{
        const sql=`select a.TenDangNhap from HocSinh as a, HocSinhBaiGiang as b where a.MaHocSinh = b.MaHocSinh and a.TenDangNhap = "${TenDangNhap}" and b.MaBaiGiang = ${MaBaiGiang}`;
        return await db.load(sql);
    },
    addHSBG: async(MaHocSinh,MaBaiGiang)=>{
        const sql=`insert into HocSinhBaiGiang (MaHocSinh,MaBaiGiang) values(${MaHocSinh},${MaBaiGiang})`;
        return await db.load(sql);
    },
    getBG: async(MaBaiGiang)=>{
        const sql=`select a.Ten, a.MoTa, b.Ten as TenGiaoVien from BaiGiang as a, GiaoVien as b where a.MaBaiGiang = "${MaBaiGiang}" and a.MaGiaoVien = b.MaGiaoVien`;
        return await db.load(sql);
    }
};