drop database if exists BaiGiangAR;
create database BaiGiangAR;
use BaiGiangAR;
SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456yugi';
create table Student(
	studentID int not null auto_increment,
    name varchar(50),
    dateOfBirth date,
    username varchar(50),
    password varchar(200),
    primary key(studentID)
);

create table Teacher(
	teacherID int not null auto_increment,
    name varchar(50),
    iNumber varchar(12),
    email varchar(50),
    password varchar(50),
    primary key (teacherID)
);

create table Lesson(
	lessonID int not null auto_increment,
    name varchar(50),
    description varchar(200),
    timeCreated datetime,
    timeUpdated datetime,
    teacherID int,
    primary key (lessonID)
);

create table StudentLesson(
	studentID int not null auto_increment,
    lessonID int,
    timeCreated datetime,
    primary key (studentID,lessonID)
);

create table Marker(
	markerID int not null auto_increment,
    URL varchar(200),
    scale float,
    lessonID int,
    filename varchar(200),
    primary key (markerID)
);

create table Interaction(
	actionID int not null auto_increment,
    interactionName varchar(50),
    primary key (actionID)
);

create table Action(
	actionID int not null auto_increment,
    name varchar(50),
    markerID int,
    primary key (actionID)
);

create table ARContent(
	contentID int not null auto_increment,
    xPosition float,
    yPosition float,
    zPosition float,
    xRotation float,
    yRotation float,
    zRotation float,
    xScale float,
    yScale float,
    zScale float,
    URL varchar(200),
    actionID int,
    filename varchar(200),
    isFile boolean,
    isTemp boolean,
    isChoosen boolean default false,
    primary key (contentID)
);
create table TextARContent(
	contentID int not null auto_increment,
    text varchar(200),
    font varchar(200),
    size int,
    color varchar(200),
    backgroundColor varchar(200),
    isTransparent bool,
    primary key (contentID)
);

/*foreign key*/
alter table Lesson add constraint FK_Lesson_Teacher foreign key (teacherID) references Teacher(teacherID);
alter table StudentLesson add constraint FK_Student_Lesson_Student foreign key (studentID) references Student(studentID);
alter table StudentLesson add constraint  FK_Student_Lesson_Lesson foreign key (lessonID) references Lesson(lessonID);
alter table Marker add constraint FK_Marker_Lesson foreign key (lessonID) references Lesson(lessonID);
alter table ARContent add constraint FK_ARContent_Action foreign key (actionID) references Action(actionID);
alter table Action add constraint FK_Action_Marker foreign key (markerID) references marker(markerID);

/*1-1 relationship*/

alter table TextARContent add constraint FK_TextARContent_ARContent UNIQUE (contentID);

alter table Interaction add constraint FK_Interaction_Action UNIQUE (actionID);
/*root*/
/* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123@'; */

insert into Teacher(name,iNumber,email,password) values('Nguyễn Văn B','123456789','duy@gmail.com','123456');
insert into Teacher(name,iNumber,email,password) values('Nguyễn Văn C','112345547','anansss1s23@gmail.com','123456');

insert into Lesson(name,description,timeCreated,timeUpdated,teacherID) values ('Hệ điều hành','hahaha','2001-01-01','2002-01-01',1);
insert into Lesson(name,description,timeCreated,timeUpdated,teacherID) values ('CSDL','hahaha','2001-01-01','2002-01-01',2);
insert into Lesson(name,description,timeCreated,timeUpdated,teacherID) values ('Hóa học','hahaha','2001-01-01','2002-01-01',1);

insert into Student(name,dateOfBirth,username,password) values('van quoc duy','1999-01-01','duyyugi','$2b$10$wNed5wEl5.LjbE2XZzwxHO7LLzn1r8XGyxrm4T3F3gl7VWzHb0.Ue');

insert into StudentLesson(studentID,lessonID,timeCreated) values(1,1,now());
insert into StudentLesson(studentID,lessonID,timeCreated) values(1,2,now());

select* from StudentLesson;
select* from Lesson;
select* from Marker;
select* from Action;
select* from ARContent;
select* from TextARContent;