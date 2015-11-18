CREATE SCHEMA `moogerfooger` ;

USE moogerfooger;

create table Presets 
(
  preset_id int AUTO_INCREMENT primary key,
  preset_name nvarchar(100) not null,
  sort_order int  
  
)