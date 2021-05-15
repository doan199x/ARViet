const db = require('../utils/db');
module.exports = {
    addNoiDungAR: async (noiDungAR) => {
        const sql = `insert into NoiDungAR (ToaDoX,ToaDoY,ToaDoZ,XoayX,XoayY,XoayZ,TiLeX,TiLeY,TiLeZ,URL,MaHanhDong,filename,LaFile,LaTam)
        values(${noiDungAR.ToaDoX},${noiDungAR.ToaDoY},${noiDungAR.ToaDoZ},${noiDungAR.XoayX},${noiDungAR.XoayY},${noiDungAR.XoayZ},${noiDungAR.TiLeX},${noiDungAR.TiLeY},${noiDungAR.TiLeZ},"${noiDungAR.URL}",${noiDungAR.MaHanhDong}
        ,"${noiDungAR.filename}",${noiDungAR.LaFile},${noiDungAR.LaTam});`
        return await db.load(sql);
    },
    findByMaNoiDung: async (MaNoiDung) => {
        const sql = `select* from NoiDungAR where MaNoiDung = ${MaNoiDung}`
        return await db.load(sql);
    },
    addNoiDungARDuocChon: async (noiDungAR, maHanhDong) => {
        const sql = `insert into NoiDungAR (ToaDoX,ToaDoY,ToaDoZ,XoayX,XoayY,XoayZ,TiLeX,TiLeY,TiLeZ,URL,MaHanhDong,filename,LaFile,LaTam)
        values(${noiDungAR.ToaDoX},${noiDungAR.ToaDoY},${noiDungAR.ToaDoZ},${noiDungAR.XoayX},${noiDungAR.XoayY},${noiDungAR.XoayZ},${noiDungAR.TiLeX},${noiDungAR.TiLeY},${noiDungAR.TiLeZ},"${noiDungAR.URL}",${maHanhDong}
        ,"${noiDungAR.filename}",${noiDungAR.LaFile},false);`
        return await db.load(sql);
    },
    getNoiDungARByHanhDong: async (MaHanhDong) => {
        const sql = `select* from NoiDungAR where MaHanhDong = ${MaHanhDong} and LaTam = false`;
        return await db.load(sql);
    },
    delete: async(MaNoiDung)=>{
        const sql = `delete from NoiDungAR where MaNoiDung = ${MaNoiDung}`;
        return await db.load(sql);
    },
    addNoiDungARVanBan: async(NoiDungARVanBan)=>{
        const sql = `insert into NoiDungARVanBan (MaNoiDung,NoiDungVanBan,FontChu,MauChu,MauNen,TrongSuot,CoChu)
        values(${NoiDungARVanBan.MaNoiDung},"${NoiDungARVanBan.NoiDungVanBan}","${NoiDungARVanBan.FontChu}"
        ,"${NoiDungARVanBan.MauChu}","${NoiDungARVanBan.MauNen}",${NoiDungARVanBan.TrongSuot},${NoiDungARVanBan.CoChu})`;
        return await db.load(sql);
    },
    getNoiDungVanBan: async(MaNoiDung)=>{
        const sql = `select* from NoiDungARVanBan where MaNoiDung = ${MaNoiDung}`;
        return await db.load(sql);
    },
    update: async(noiDungUpdate)=>{
        const sql =`update NoiDungAR set ToaDoX = ${noiDungUpdate.ToaDoX}, ToaDoY = ${noiDungUpdate.ToaDoY}, ToaDoZ = ${noiDungUpdate.ToaDoZ},
        TiLeX = ${noiDungUpdate.TiLeX},TiLeY = ${noiDungUpdate.TiLeY},TiLeZ = ${noiDungUpdate.TiLeZ},
        XoayX = ${noiDungUpdate.XoayX},XoayY = ${noiDungUpdate.XoayY},XoayZ = ${noiDungUpdate.XoayZ}
        where MaNoiDung = ${noiDungUpdate.MaNoiDung};
        `
        return await db.load(sql);
    }
};