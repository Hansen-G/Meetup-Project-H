#cd server
# Remove the database file (if run multiple times - not in README)
rm db/dev.db 2> /dev/null || true

# Generate User Model & Migration

npx sequelize-cli model:generate --name User --attributes first_name:STRING,last_name:STRING,email:STRING,hashedPassword:STRING


# Generate Group Model & Migration

npx sequelize-cli model:generate --name Group --attributes organizerId:INTEGER,name:STRING,about:STRING,type:STRING,private:BOOLEAN,city:STRING,state:STRING,createdAt:DATE,updatedAt:DATE,numMembers:INTEGER,previewImage:STRING

# Generate Event Model & Migration

npx sequelize-cli model:generate --name Event --attributes groupId:INTEGER,venueId:INTEGER,name:STRING,type:STRING,startDate:DATE,numAttending:INTEGER,previewImage:STRING

# Generate Venue Model & Migration

npx sequelize-cli model:generate --name Venue --attributes city:STRING,state:STRING,latitude:FLOAT,longitude:FLOAT


# Generate Group-Member Model & Migration

npx sequelize-cli model:generate --name GroupMember --attributes userId:INTEGER,groupId:INTEGER,memberStatus:STRING

# Generate Event-Attendee Model & Migration

npx sequelize-cli model:generate --name EventAttendee --attributes eventId:INTEGER,userId:INTEGER,attendeeStatus:STRING

# Generate Image Model & Migration

npx sequelize-cli model:generate --name Image --attributes eventId:INTEGER,groupId:INTEGER,url:STRING
