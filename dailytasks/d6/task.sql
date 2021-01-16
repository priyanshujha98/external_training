-- Comments
-- Create Database


CREATE database Hospital; 

-- Use the Database as Default Database for creating Tables/ Views / Stored Procedures

use Hospital;

-- Get the List of all databases 
SHOW DATABASES;

-- DELETE the database

DROP DATABASE Hospital;


-- Create a Table in Hospital Database
-- Step 1: Make sure that the Database is set to Default
Use Hospital;

-- Step 2: Command to Create table
-- Keys for the table, these are important 'CONSTRAINTS' for the table
-- 1. Primary Key, the Uique Identitifiucation of the Row with a unique (non-repeated value) value for the column.
	-- If forcibally instered duplicate record, then 'PRIMARY-KEY-VIOLATION' error will be returned
    -- Per table only one primary key is possible
    -- The ptimary key column cannot be	 null or empty
	-- Recommendatyion for Datatype for Primary Key, INT or BIGINT
    -- 1.a. the AUTO_INCREAMENT value for Primary Key, value will be autmatically increamented by the DB Engine aka IDENTITY_KEY
-- 2. Unique Key, used to prevent more than one records for storing the identitcal values into the column
	--  It can store only distinct values for integrity 
	-- 	Unique key can contain NULL value in it
-- EACH PRIMAY-KEY is UNIUQUE-KEY excpept that it cannot contain NULL values
-- SOME OTHER CONSTRAINTS
	-- NOT NULL
    -- FOREIGN-KEY


Create Table Doctors(
	DorctorRowId INT AUTO_INCREMENT PRIMARY KEY,  
    DoctorId VARCHAR(10) Unique Not Null,
    DoctorName VARCHAR(200) Not Null,
    Degree VARCHAR(100) Not Null,
    Specialization VARCHAR(100) Not Null,
    ContactNumber INT NOT NULL,
    Email VARCHAR(50)
)  ; 
 -- Drop Table Doctors
 
 -- Modifying the table by adding a new column in it
 Alter table Doctors Add Column City VARCHAR(200) Not null ;
 
 -- Modicy the table by renaming the column
 -- Modifying DorctorRowId to DoctorRowId
 
 Alter table Doctors Change DorctorRowId DoctorRowId INT AUTO_INCREMENT;
 
 
 
 -- inserting row in Doctors table
 insert into Doctors Values(
   1,'Doc-1001', 'Dr. Anil', 'MBBS', 'Heart', 88881111, 'dranilk@myhospital.com', 'Pune' 
 );
 
 -- Duplicate Entry Error
 
  insert into Doctors Values(
   2,'Doc-1002', 'Dr. Abhay', 'BAMS', 'General Physician', 58881111, 'drbhay@myhospital.com', 'Pune' 
 );
 
 -- Adding Multiple Records
 
 insert into Doctors Values
 ( 3,'Doc-1003', 'Dr. Govind', 'MD', 'Diabetic', 58881111, 'drgovind@myhospital.com', 'Pune' ),
 ( 4,'Doc-1004', 'Dr. Mahesh', 'MBBS', 'Heart', 218881111, 'drmahesh@myhospital.com', 'Kolhapur' ),
 ( 5,'Doc-1005', 'Dr. Piyush', 'BHMS', 'Cancer', 18881111, 'drpiyush@myhospital.com', 'Mumbai' ),
 ( 6,'Doc-1006', 'Dr. Farhan', 'MD', 'ENT', 68881111, 'drfarhan@myhospital.com', 'Satara' );

insert into Doctors(DoctorId, DoctorName, Degree, Specialization, ContactNumber, Email,City)
values
 ('Doc-1007', 'Dr. Akash', 'MBBS', 'ENT', 78881111, 'drakash@myhospital.com', 'Pune' );

 

 select * from Doctors;
 
 -- Creating table with Unique contrainint added seperately
 Create Table Patients(
	PatientRowId INT AUTO_INCREMENT PRIMARY KEY,
    PatientId varchar(10),
    PatientName VARCHAR(200) Not Null,
    Address VARCHAR(300) Not Null,
    ContactNo int Not null,
    Email VARCHAR(100),
    Age int Not Null,
    Gender Varchar(10) Not Null,
    CONSTRAINT patientId_unique Unique(PatientId)
 );
  

-- Modifying the table by adding multiple columns in it
-- e.g. Patients table must have City and State and Emergency contact number
Alter table Patients
ADD COLUMN EmergencyContactNo int not null,
ADD COLUMN LandLineNo int,
ADD COLUMN City Varchar(200) not null ;

-- drop column
Alter table Patients
DROP COLUMN LandLineNo;

-- drop multiple columns
Alter table Patients
DROP COLUMN EmergencyContactNo,  
DROP COLUMN City;



-- Working with AUTO_INCREMENT

create table WardMaster (
  WardId int NOT NULL AUTO_INCREMENT,
  WardName varchar(200) not null,
  Constraint wardid_primary_key  Primary key (WardId)
);

-- not adding the WardId, generating based on DB-Engine
insert into WardMaster(WardName) values ('General');

-- Explicitely adding the value for WardId, the AUTO_INCREMENT
-- the default will be overwritten
insert into WardMaster(WardId, WardName) values(2, 'Infants');
-- Change the AUTO_INCREMENT value
insert into WardMaster(WardId, WardName) values(101, 'Cancer');
-- Here the WardId value generated will be 102
insert into WardMaster(WardName) values ('Special');


select * from WardMaster;
-- updating the WardName of WardId as 100
Update WardMaster set WardName= 'ENT' where WardId =100;

-- Establish Relationship Across Tableas using Foreign Key Constraints

 -- REFERENCES WardMaster(WardId) means that the WardId column
 -- from the WardMaster table is linked with the WardId column
 -- of the RoomsMaster with Referential inregrity
 -- If the WardId is deleted the rooms will also be deleted
Create Table RoomsMaster(
	RoomUniqueId int Primary Key,
    RoomId varchar (100) Unique not null,
    RoomType Varchar(100) not null,
    BedsCount int not null,
    WardId int not null,
    Constraint fk_ward_id FOREIGN KEY (WardId)
    REFERENCES WardMaster(WardId)
    On DELETE Cascade
);

insert into RoomsMaster values(10001, 'Gen-0001', 'Single', 1, 1) ;

insert into RoomsMaster values(10002, 'Gen-0002', 'Double', 2, 1) ;

insert into RoomsMaster values(10003, 'Inf-0001', 'Single', 1, 2) ;

insert into RoomsMaster values(10004, 'Inf-0002', 'Multi', 4, 2) ;

insert into RoomsMaster values(10005, 'ENT-0001', 'Multi', 5, 100); 

-- The followig insert statement will produce error
-- because teh WardId=100 is not present in WardMaster table
-- hence it  breaks the Referential Integrity aka Foreign Key Constraint 
insert into RoomsMaster values(10006, 'Canc-0001', 'Single-AC', 1, 200) ;

-- Taking an experoence for the Cascade Delete
-- Corrensponding Rooms from the RoomsMaster will be deleted
delete from WardMaster where WardId =100;

select * from RoomsMaster;

Select * from Patients;
-- where cluse will execute a condition on each row of the table
-- this condition if eveluated to true then only the resultant will be displayed

Select * from Doctors where City = 'Pune';

-- Read values from the table by eliminating the duplicate records from table
select DISTINCT City from Doctors;

select Distinct DoctorName from DOctors;
 
 -- Hoe many number of doctors per city
 
 select City, Count(*) from Doctors Group by City;
 -- Displaying Doctors order by the name of the City 
 Select * from Doctors order by City;
 
 -- Display MBBS Doctors only
 select DoctorName, Degree from Doctors where Degree = 'MBBS' ;
 
 -- Display Doctors in Kolhapur and Mumbai
 
 select DoctorName, City from Doctors where City = 'Mumbai' or City = "Kolhapur";
 -- using IN Operator
 select DoctorName, city from Doctors where City IN ('Mumbai', 'Satara');

-- Create a DoctorPatientOPD Table
-- DoctorPatientOPD table is chaild of 
-- Doctors and Patients Tables 
Create table DoctorPatientOPD(
	RegistrationUniqueId int Auto_INCREMENT not null,
    RegistrationId varchar(100) not null,
    PatientRowId int not null,
    DoctorRowId int not null,
    Fees int not null,
    Constraint fk_patient_row_is FOREIGN KEY (PatientRowId)
    References patients (PatientRowId),
    Constraint fk_doctor_row_id Foreign Key (DoctorRowId)
    References Doctors (DoctorRowId),
    Constraint pk_registretion_unique_id Primary Key (RegistrationUniqueId)
);

-- Create a DoctorPatientOPD Table
-- DoctorPatientOPD table is chaild of 
-- Doctors and Patients, RoomsMaster Tables 

Create table DoctorPatientIPD(
	RegistrationUniqueId int Auto_INCREMENT not null,
    RegistrationId varchar(100) not null,
    PatientRowId int not null,
    DoctorRowId int not null,
    RoomUniqueId int not null,
    Constraint fk_patient_rowroom_is FOREIGN KEY (PatientRowId)
    References patients (PatientRowId),
    Constraint fk_doctor_rowroom_id Foreign Key (DoctorRowId)
    References Doctors (DoctorRowId),
	Constraint fk_room_unique_id Foreign Key (RoomUniqueId)
    References RoomsMaster (RoomUniqueId),
    Constraint pk_registretion_unique_id Primary Key (RegistrationUniqueId)
);

Create table HouseKeepingStaff (
	StaffId int Primary key,
    StaffName varchar(200) not null,
    Address varchar(200) not null,
    City varchar(200) not null,
    Salary int not null
);

insert into HouseKeepingStaff values(101, 'A', 'Ad1', 'Kothroud', 20000);	
insert into HouseKeepingStaff values(102, 'B', 'Ad2', 'Shivajinagar', 12000);
insert into HouseKeepingStaff values(103, 'C', 'Ad3', 'Bavdhan', 18000);
insert into HouseKeepingStaff values(104, 'D', 'Ad4', 'Navi Peth', 24000);
insert into HouseKeepingStaff values(105, 'E', 'Ad5', 'Vanaz', 9000);

select * from HouseKeepingStaff;

-- select second max salary of the staff


select max(Salary) as maxsal from HouseKeepingStaff
where salary < (Select max(salary) from HouseKeepingStaff);
-- computed column value
select (Salary * 0.02) as Tax from HouseKeepingStaff;


-- Hand-on Lab

-- 1. Insert records in DoctorPatientIPD and DoctorPatientOPD tables
-- 2. Find out Patients assigned to each doctor in seperate result from both tables
	-- Hint: For each distinct DoctorId read patient ids and then based on patient id 
	-- display their names
-- 3. Find out how many number of heart patients are in IPD 
	-- Query to DoctorPatientIPD and Doctors table find out the DoctorID having Specializartion
    -- as Heart ane then from DoctorPatientIPD read Paitent id for heart specilist and display
    -- their names
 


Select PatientName, DoctorName, Patients.PatientRowId, Doctors.DoctorRowId from
Doctors, Patients, DoctorPatientIPD
where Doctots.DoctorRowId = DoctorPatientIPD.DoctorRowId
and Patients.PatientRowId = DoctorPatientIPD.PatientRowId


insert into patients values( 12,'P1', 'Priyanshu','Pune' ,888888888,'a@b.com',23, 'Male');	
insert into patients values( 13,'P2', 'Kshitij','Pune' ,888888888,'b@a.com',23, 'Male');
	
insert into DoctorPatientIPD values(1, 'A', 12,2 , 10001);	
insert into DoctorPatientOPD values(1, '1st Registration', 12, 2, 120000);


insert into DoctorPatientIPD values(2, 'B', 13,1 , 10002);	
insert into DoctorPatientOPD values(2, '2st Registration', 13, 1, 130000);

select PatientId, PatientName from patients where PatientRowId=(select PatientRowId from doctorpatientopd where DoctorRowId = 2);

select PatientId, PatientName from patients where PatientRowId=(select PatientRowId from doctorpatientipd where DoctorRowId IN (select DoctorRowId  from doctors where Specialization='Heart'));
select count(PatientId) from patients where PatientRowId=(select PatientRowId from doctorpatientipd where DoctorRowId IN (select DoctorRowId  from doctors where Specialization='Heart'));

select patients.PatientId, patients.PatientName,doctors.DoctorName  from patients left JOIN 
(select doctors.DoctorName, doctors.DoctorRowId, doctorpatientipd.PatientRowId  as o from doctors inner join
 doctorpatientipd on doctors.DoctorRowId=doctorpatientipd.DoctorRowId) 
 on doctors.PatientRowId = patients.PatientRowId 