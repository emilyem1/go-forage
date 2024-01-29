INSERT INTO USER_ACCOUNT (FULLNAME, EMAIL, PASSWORD, PHOTO_URL)
VALUES 
  ('John Doe', 'jdoe@test.com', 'asd', 'https://avatar.iran.liara.run/public/30'),
  ('Alice Wonderland', 'awond@test.com', 'asd', 'https://avatar.iran.liara.run/public/58'),
  ('Sita Dennis', 'sitad@test.com', 'asd', 'https://avatar.iran.liara.run/public/100'),
  ('Sasha Mateo', 'matte@test.com', 'asd', 'https://avatar.iran.liara.run/public/67'),
  ('Anita Austi', 'anita@test.com', 'asd', 'https://avatar.iran.liara.run/public/98'),
  ('Lukas Souza', 'lsouza@test.com', 'asd', 'https://avatar.iran.liara.run/public/5'),
  ('Jose Alejandro', 'josea@test.com', 'asd', 'https://avatar.iran.liara.run/public/49'),
  ('Dwayne Jacob', 'jdwayne@test.com', 'asd', 'https://avatar.iran.liara.run/public/20'),
  ('Allison Saeng', 'saeng@test.com', 'asd', 'https://avatar.iran.liara.run/public/64'),
  ('Adrea Santos', 'santa@test.com', 'asd', 'https://avatar.iran.liara.run/public/86');

INSERT INTO MUSHROOM (TITLE, IMAGE_URL, INFO, EDIBLE) VALUES
  ('Shaggy Mane', 'mushrooms/shaggy_mane.png', 'Description for Shaggy Mane', true),
  ('Oyster Mushroom', 'mushrooms/oyster_mushroom.png', 'Description for Oyster Mushroom', true),
  ('King Bolete', 'mushrooms/king_bolete.png', 'Description for King Bolete', true),
  ('Saffron Milk Cap', 'mushrooms/saffron_milk_cap.png', 'Description for Saffron Milk Cap', true),
  ('Gem-Studded Puffball', 'mushrooms/gem_studded_puffball.png', 'Description for Gem-Studded Puffball', true),
  ('Rosy Gomphidius', 'mushrooms/rosy_gomphidius.png', 'Description for Rosy Gomphidius', true),
  ('Winter Chanterelle', 'mushrooms/winter_chanterelle.png', 'Description for Winter Chanterelle', true),
  ('Pacific Golden Chanterelle', 'mushrooms/pacific_golden_chanterelle.png', 'Description for Pacific Golden Chanterelle', true),
  ('Orange Peel Fungus', 'mushrooms/orange_peel_fungus.png', 'Description for Orange Peel Fungus', true),
  ('Apricot Jelly', 'mushrooms/apricot_jelly.png', 'Description for Apricot Jelly', true),
  ('Crab Brittlegill', 'mushrooms/crab_brittlegill.png', 'Description for Crab Brittlegill', true),
  ('Lobster Mushroom', 'mushrooms/lobster_mushroom.png', 'Description for Lobster Mushroom', true),
  ('Inky Cap', 'mushrooms/inky_cap.png', 'Description for Inky Cap', true),
  ('Toothed Jelly Fungus', 'mushrooms/toothed_jelly_fungus.png', 'Description for Toothed Jelly Fungus', true),
  ('Horse Mushroom', 'mushrooms/horse_mushroom.png', 'Description for Horse Mushroom', true),
  ('Meadow Mushroom', 'mushrooms/meadow_mushroom.png', 'Description for Meadow Mushroom', true),
  ('Cauliflower Mushroom', 'mushrooms/cauliflower_mushroom.png', 'Description for Cauliflower Mushroom', true),
  ('Hedgehog Mushroom', 'mushrooms/hedgehog_mushroom.png', 'Description for Hedgehog Mushroom', true),
  ('Chicken of the Woods', 'mushrooms/chicken_of_the_woods.png', 'Description for Chicken of the Woods', true),
  ('Bear''s Head', 'mushrooms/bears_head.png', 'Description for Bear''s Head', true),
  ('Lion''s Mane', 'mushrooms/lions_mane.png', 'Description for Lion''s Mane', true),
  ('Western Giant Puffball', 'mushrooms/western_giant_puffball.png', 'Description for Western Giant Puffball', true),
  -- Non-edible:
  ('Death Cap', 'mushrooms/death_cap.png', 'Description for Death Cap', false),
  ('Pholiotina rugosa', 'mushrooms/pholiotina_rugosa.png', 'Description for Pholiotina rugosa', false),
  ('Smith''s Amanita', 'mushrooms/smiths_amanita.png', 'Description for Smith''s Amanita', false),
  ('Deadly Galerina', 'mushrooms/deadly_galerina.png', 'Description for Deadly Galerina', false),
  ('Deadly Parasol', 'mushrooms/deadly_parasol.png', 'Description for Deadly Parasol', false),
  ('Fly Agaric', 'mushrooms/fly_agaric.png', 'Description for Fly Agaric', false);

-- 10 Inserts for BLOG table
INSERT INTO BLOG (TITLE, content, publication_date, latitude, longitude, USER_ID, MUSHROOM_ID) VALUES
  ('Exploring Chanterelles', 'Today, I went on a hike and found some delicious Chanterelles.', '2022-01-15', 50.15839605653889, -126.6635744422674, 1, 1),
  ('The Mystery of the Death Cap', 'Beware of the Death Cap mushroom; it can be lethal if consumed.', '2022-02-02', 49.960909365760074, -115.8530275672674, 2, 6),
  ('Truffle Hunting Adventure', 'Embarked on a truffle hunting adventure and discovered the magic of these rare fungi.', '2022-02-20', 50.99557859676613, -121.3461916297674, 3, 10),
  ('Magical Amanita Muscaria', 'The Amanita Muscaria is beautiful but toxic. Learn about its fascinating history.', '2022-03-10', 52.08876065107938, -126.2680666297674, 4, 8),
  ('Culinary Delight with Shiitake', 'Experimented with Shiitake mushrooms in the kitchen and created a delicious dish.', '2022-03-25', 53.12944258841553, -121.3022463172674, 5, 4),
  ('Morel Mushroom Foraging', 'Ventured into the woods and discovered the unique honeycomb pattern of Morel mushrooms.', '2022-04-05', 53.182145421239646, -128.02099631726742, 6, 2),
  ('A Fungus Among Us: Oyster Mushroom', 'Explored the versatility of Oyster mushrooms in various culinary delights.', '2022-04-20', 53.60144255177566, -132.15185569226742, 7, 5),
  ('Lions Mane Beauty', 'Encountered the fascinating Lions Mane mushroom and marveled at its unusual appearance.', '2022-05-10', 57.446040559523546, -120.98632945503736, 8, 9),
  ('Porcini Adventure', 'Went on a Porcini foraging expedition and relished the robust and nutty flavor in a risotto.', '2022-05-25', 59.154442775922355, -122.26074351753736, 9, 7),
  ('Mushroom Spotting with the Truffle Hounds', 'Joined a truffle hunting party and witnessed the skilled truffle hounds at work.', '2022-06-05', 58.009172065877394, -129.995118517537386, 1, 3);

-- 10 Inserts for FRIENDS table
INSERT INTO FRIENDS (USER_ID, FRIEND_USER_ID, FRIENDSHIP_STATUS) VALUES
  (1, 2, true),
  (1, 3, true),
  (2, 4, true),
  (3, 5, false),
  (4, 6, true),
  (5, 7, false),
  (6, 8, true),
  (7, 9, true),
  (8, 10, false),
  (9, 1, true);

-- 10 Inserts for FAVOURITES table
INSERT INTO FAVOURITES (USER_ID, BLOG_ID) VALUES
  (1, 1),
  (2, 3),
  (3, 5),
  (4, 7),
  (5, 9),
  (6, 2),
  (7, 4),
  (8, 6),
  (9, 8),
  (10, 9);

-- 10 Inserts for MUSHROOM_POST table
INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID) VALUES
  (1, 1),
  (2, 6),
  (3, 10),
  (4, 8),
  (5, 4),
  (6, 2),
  (7, 5),
  (8, 9),
  (9, 7),
  (10, 3);

-- 10 Inserts for COMMENTS table
INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE) VALUES
  (1, 2, 'Great find! Chanterelles are delicious.'),
  (2, 3, 'Thanks for the warning about the Death Cap. Stay safe!'),
  (3, 4, 'Truffle hunting sounds like an amazing adventure!'),
  (4, 5, 'The Amanita Muscaria is indeed beautiful but dangerous.'),
  (5, 6, 'Shiitake mushrooms are my favorite too!'),
  (6, 7, 'Morel mushrooms have such a unique appearance.'),
  (7, 8, 'Oyster mushrooms are so versatile in cooking.'),
  (8, 9, 'Lions Mane mushrooms are truly fascinating.'),
  (9, 10, 'Porcini risotto must have been delicious!'),
  (10, 1, 'Truffle hounds are incredible at finding treasures.');