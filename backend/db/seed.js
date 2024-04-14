const client = require("./index");

const seed = async () => {
  console.log("Seeding the database");
  client.connect();

  try {
    // Clear the database
    await client.query(`
        DROP TABLE IF EXISTS post_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
      `);
    // Recreate tables
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE,
          password varchar(255),
          name varchar(255),
          location varchar(255),
          active boolean DEFAULT true
        );
  
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          title varchar(255),
          content TEXT,
          active BOOLEAN DEFAULT true
        );
  
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE
        );
  
        CREATE TABLE post_tags (
          "postId" INTEGER REFERENCES posts(id),
          "tagId" INTEGER REFERENCES tags(id),
          UNIQUE ("postId", "tagId")
        );
      `);

    // Create Users and Posts
    const users = [
      {
        username: "johndoe1",
        password: "1234qwer",
        name: "John Doe",
        location: "Los Angles",
      },
      {
        username: "jimbob12",
        password: "3456erty",
        name: "Jim-Bob Delroy",
        location: "Portland",
      },
      {
        username: "jenny123",
        password: "5678tyui",
        name: "Jenny Delonge",
        location: "Seatle",
      },
    ];

    const posts = [
      {
        title: "What a fine day",
        content: "The weather in LA is fantastic today.",
        tags: "#sunnyday, #whataday, #getoutstayout",
      },
      {
        title: "Take it slow",
        content:
          "A day like today is a day that reminds you to take life slow.",
        tags: "#relax, #lifeisbeautiful, #livelaughlove",
      },
      {
        title: "Where to next",
        content:
          "As I sat at my local coffee shop, I began to day dream of where to travel to next.",
        tags: "#wanderlust, #traveldiaries, #adventureawaits",
      },
      {
        title: "Hot summer nights",
        content:
          "In the south there is nothing worse and yet comforting than a hot summer night",
        tags: "sunnyafternoons, #weatherwatch, #weatherlove",
      },
      {
        title: "Life flies",
        content:
          "Nothing has suprised me more over the years, as the fact that time seems to move so slow but when you turn around you wonder how you got here.",
        tags: "#cherisheverymoment, #lifelessons, #lifegoals",
      },
      {
        title: "Time to travel",
        content:
          "It is on days like today that I feel the travel bug taking hold.  I think it's time to go somewhere.",
        tags: "#travelbug, #roadtrip, #travelgoals",
      },
      {
        title: "Rainy days and cold nights",
        content: "Nothing yells Seattle like a rainy day and cold night.",
        tags: "#cloudyskies, #rainydays, #stormynights",
      },
      {
        title: "Reflections",
        content:
          "Every once and a while I try to reflect on my year so far. I find that it helps to center me, and helps me be content with my life.",
        tags: "#gratitude, #mindfulness, #livingmybestlife",
      },
      {
        title: "Someplace dry",
        content:
          "Someplace is the place that I long to be, it is the place that calls me when I get the bug.  Someplace is where I belong, it is a place yet uncharted.",
        tags: "#exploretheworld, #intotheunknown, #globetrotter",
      },
    ];

    for (const user of users) {
      await client.query({
        text: `
          INSERT INTO users (username, password, name, location)
          VALUES ($1, $2, $3, $4);
        `,
        values: [user.username, user.password, user.name, user.location],
      });

      const { rows: userRows } = await client.query(`
          SELECT id FROM users WHERE username = '${user.username}';
        `);

      const userId = userRows[0].id;

      const userPosts = posts.filter(
        (post, index) => index % 3 === users.indexOf(user)
      );

      for (const post of userPosts) {
        await client.query({
          text: `
            INSERT INTO posts ("authorId", title, content)
            VALUES ($1, $2, $3);
          `,
          values: [userId, post.title, post.content],
        });

        const { rows: postRows } = await client.query(`
            SELECT id FROM posts WHERE title = '${post.title}';
          `);

        const postId = postRows[0].id;

        const tagNames = post.tags.split(", ");

        for (const tagName of tagNames) {
          const { rows: existingTags } = await client.query({
            text: `
              SELECT id FROM tags WHERE name = $1;
            `,
            values: [tagName],
          });

          let tagId;
          if (existingTags.length > 0) {
            tagId = existingTags[0].id;
          } else {
            const { rows: newTag } = await client.query({
              text: `
                  INSERT INTO tags (name)
                  VALUES ($1)
                  RETURNING id;
                `,
              values: [tagName],
            });
            tagId = newTag[0].id;
          }

          const { rows: existingPostTags } = await client.query({
            text: `
                SELECT * FROM post_tags WHERE "postId" = $1 AND "tagId" = $2;
              `,
            values: [postId, tagId],
          });

          if (existingPostTags.length === 0) {
            await client.query({
              text: `
                INSERT INTO post_tags ("postId", "tagId")
                VALUES ($1, $2);
              `,
              values: [postId, tagId],
            });
          }
        }
      }
    }

    console.log("Completed seeding the database");
  } catch (error) {
    console.error("Error seeding the database!");
    throw error;
  } finally {
    client.end();
  }
};

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
