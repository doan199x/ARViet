drop database if exists BaiGiangAR;
create database BaiGiangAR;
use BaiGiangAR;
SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456yugi';
create table HocSinh(
	MaHocSinh int not null auto_increment,
    Ten varchar(50),
    NgaySinh date,
    TenDangNhap varchar(50),
    MatKhau varchar(50),
    primary key(MaHocSinh)
);

create table GiaoVien(
	MaGiaoVien int not null auto_increment,
    Ten varchar(50),
    CMND varchar(12),
    Email varchar(50),
    MatKhau varchar(50),
    primary key (MaGiaoVien)
);

create table BaiGiang(
	MaBaiGiang int not null auto_increment,
    Ten varchar(50),
    MoTa varchar(200),
    ThoiGianTao datetime,
    ThoiGianCapNhat datetime,
    MaGiaoVien int,
    primary key (MaBaiGiang)
);

create table HocSinhBaiGiang(
	MaHocSinh int not null auto_increment,
    MaBaiGiang int,
    ThoiGianTao datetime,
    primary key (MaHocSinh,MaBaiGiang)
);

create table DiemDanhDau(
	MaDiemDanhDau int not null auto_increment,
    URL varchar(200),
    TiLe float,
    MaBaiGiang int,
    filename varchar(200),
    primary key (MaDiemDanhDau)
);

create table TuongTac(
	MaHanhDong int not null auto_increment,
    KieuTuongTac varchar(50),
    primary key (MaHanhDong)
);

create table HanhDong(
	MaHanhDong int not null auto_increment,
    NoiDung varchar(50),
    MaDiemDanhDau int,
    primary key (MaHanhDong)
);

create table NoiDungAR(
	MaNoiDung int not null auto_increment,
    ToaDoX float,
    ToaDoY float,
    ToaDoZ float,
    XoayX float,
    XoayY float,
    XoayZ float,
    TiLeX float,
    TiLeY float,
    TiLeZ float,
    URL varchar(200),
    MaHanhDong int,
    filename varchar(200),
    LaFile boolean,
    LaTam boolean,
    primary key (MaNoiDung)
);
create table NoiDungARVanBan(
	MaNoiDung int not null auto_increment,
    NoiDungVanBan varchar(200),
    FontChu varchar(200),
    MauChu varchar(200),
    MauNen varchar(200),
    TrongSuot bool,
    primary key (MaNoiDung)
);

create table NoiDungARCon(
	MaNoiDung int not null auto_increment,
	MaHanhDong int,
    primary key (MaNoiDung)
);

/*foreign key*/
alter table BaiGiang add constraint FK_BaiGiang_GiaoVien foreign key (MaGiaoVien) references GiaoVien(MaGiaoVien);
alter table HocSinhBaiGiang add constraint FK_HSBG_HocSinh foreign key (MaHocSinh) references HocSinh(MaHocSinh);
alter table HocSinhBaiGiang add constraint FK_HSBG_BaiGiang foreign key (MaBaiGiang) references BaiGiang(MaBaiGiang);
alter table DiemDanhDau add constraint FK_DiemDanhDau_BaiGiang foreign key (MaBaiGiang) references BaiGiang(MaBaiGiang);
alter table NoiDungAR add constraint FK_NoiDungAR_HanhDong foreign key (MaHanhDong) references HanhDong(MaHanhDong);
alter table HanhDong add constraint FK_HanhDong_DiemDanhDau foreign key (MaDiemDanhDau) references DiemDanhDau(MaDiemDanhDau);
alter table NoiDungARCon add constraint FK_NoiDungARCon_HanhDong foreign key (MaHanhDong) references HanhDong(MaHanhDong);

/*1-1 relationship*/

alter table NoiDungARVanBan add constraint FK_NoiDungARVanBan_NoiDungAR UNIQUE (MaNoiDung);

alter table NoiDungARCon add constraint FK_NoiDungARCon_NoiDungAR UNIQUE (MaNoiDung);

alter table TuongTac add constraint FK_TuongTac_HanhDong UNIQUE (MaHanhDong);
/*root*/
/* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123@'; */

insert into GiaoVien(Ten,CMND,Email,MatKHau) values('Nguyễn Văn B','123456789','anan1s23@gmail.com','123456');
insert into GiaoVien(Ten,CMND,Email,MatKHau) values('Nguyễn Văn C','112345547','anansss1s23@gmail.com','123456');


insert into HocSinh (Ten,NgaySinh,TenDangNhap,MatKhau) values('Nguyễn Văn B','1999-01-01','haha0234','123456');
insert into HocSinh (Ten,NgaySinh,TenDangNhap,MatKhau) values('Nguyễn Văn C','1999-01-01','haha02342','123456');

insert into BaiGiang(Ten,MoTa,ThoiGianTao,ThoiGianCapNhat,MaGiaoVien) values ('Hệ điều hành','hahaha','2001-01-01','2002-01-01',1);
insert into BaiGiang(Ten,MoTa,ThoiGianTao,ThoiGianCapNhat,MaGiaoVien) values ('CSDL','hahaha','2001-01-01','2002-01-01',2);
insert into BaiGiang(Ten,MoTa,ThoiGianTao,ThoiGianCapNhat,MaGiaoVien) values ('Hóa học','hahaha','2001-01-01','2002-01-01',1);

insert into HocSinhBaiGiang(MaHocSinh,MaBaiGiang,ThoiGianTao) values(1,1,now());
insert into HocSinhBaiGiang(MaHocSinh,MaBaiGiang,ThoiGianTao) values(1,2,now());

