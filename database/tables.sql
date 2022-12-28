use igse;


-- USERS TBALE
create table users (
	id int primary key auto_increment,
	email Varchar(255) not null unique,
	address varchar(255),
	numOfBedrooms int,
	propertyType enum('DETACHED', 'SEMI_DETACHED', 'TERRACED', 'FLAT', 'COTTAGE', 'BUNGALOW', 'MANSION'),
	role enum('ADMIN', 'USER') not null,
	credit float default 0,
	password varchar(255) not null
);



-- VOUCHERS TABLE
create table vouchers (
	id int primary key auto_increment,
	code Varchar(255) not null unique,
	credit float not null
);


-- LINK USERS TO VOUCHERS
create table users_vouchers (
	userId int not null,
	voucherId int not null,
	primary key (userId, voucherId),
	foreign key (userId) references users(id) on delete cascade,
	foreign key (voucherId) references vouchers(id) on delete cascade
);

insert into vouchers (code, credit)
values
	('XTX2GZAD' ,200),
	('NDA7SY2V' ,200),
	('RVA7DZ2D' ,200),
	('DM8LEESR' ,200);


-- Add accounts
insert into users (email, password, role) values ('gse@shangrila.gov.un', '$2a$15$aLjLVoC4X6jwsZI.gOWQmOqq7AoWOyiO.bRj8RZwj.HX8UwcgAv5S', 'ADMIN');

insert into users (email, address, numOfBedrooms, propertyType, role, password) 
	values ('test@gmail.com', '125 Rosewell', 4, 'MANSION', 'USER', '$2a$15$BLYu05hhFt6OsAy545AsreX4mg9kG3muftjFLA2lKfWp0KbT9kB8i');



-- READINGS TABLE
create table readings(
	id int primary key auto_increment,
	userId int not null,
	date date,
	gas int not null,
	electricityDay int not null,
	electricityNight int not null,
	paid bit not null default 0,
	foreign key (userId) references users(id)
);
