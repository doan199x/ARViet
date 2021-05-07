const db = require('../utils/db');
module.exports = {
    LayDSBG: async (TenDangNhap) => {
        const sql = `select b.MaBaiGiang, b.Ten, b.Mota,c.Ten as TenGiaoVien from HocSinhBaiGiang as a, BaiGiang as b, GiaoVien as c, HocSinh as d where d.TenDangNhap = '${TenDangNhap}' and a.MaHocSinh = d.MaHocSinh and a.MaBaiGiang = b.MaBaiGiang and b.MaGiaoVien = c.MaGiaoVien;`;
        const isExisted = await db.load(sql);
        return isExisted;
    }
};