CREATE TABLE "Users"(
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("id");
CREATE TABLE "Groups"(
    "id" INTEGER NOT NULL,
    "organizer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL,
    "num_members" INTEGER NOT NULL,
    "preview_image" TEXT NOT NULL
);
ALTER TABLE
    "Groups" ADD PRIMARY KEY("id");
CREATE TABLE "GroupMember"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL
);
ALTER TABLE
    "GroupMember" ADD PRIMARY KEY("id");
CREATE TABLE "Events"(
    "id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "venue_id" INTEGER NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "num_attending" INTEGER NOT NULL,
    "previewImage" TEXT NOT NULL
);
ALTER TABLE
    "Events" ADD PRIMARY KEY("id");
CREATE TABLE "Venue"(
    "id" INTEGER NOT NULL,
    "city" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL
);
ALTER TABLE
    "Venue" ADD PRIMARY KEY("id");
CREATE TABLE "EventUser"(
    "id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "EventUser" ADD PRIMARY KEY("id");
CREATE TABLE "Image"(
    "id" INTEGER NOT NULL,
    "event_id" INTEGER NULL,
    "group_id" INTEGER NULL
);
ALTER TABLE
    "Image" ADD PRIMARY KEY("id");
ALTER TABLE
    "EventUser" ADD CONSTRAINT "eventuser_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");
ALTER TABLE
    "GroupMember" ADD CONSTRAINT "groupmember_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "Groups"("id");
ALTER TABLE
    "Groups" ADD CONSTRAINT "groups_organizer_id_foreign" FOREIGN KEY("organizer_id") REFERENCES "Users"("id");
ALTER TABLE
    "GroupMember" ADD CONSTRAINT "groupmember_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");
ALTER TABLE
    "Events" ADD CONSTRAINT "events_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "Groups"("id");
ALTER TABLE
    "Events" ADD CONSTRAINT "events_venue_id_foreign" FOREIGN KEY("venue_id") REFERENCES "Venue"("id");
ALTER TABLE
    "EventUser" ADD CONSTRAINT "eventuser_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "Events"("id");
ALTER TABLE
    "Image" ADD CONSTRAINT "image_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "Events"("id");
ALTER TABLE
    "Image" ADD CONSTRAINT "image_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "Groups"("id");