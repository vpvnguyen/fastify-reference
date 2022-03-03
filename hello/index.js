const fastify = require("fastify");

const app = fastify({ logger: true });

app.register(require("fastify-routes"));

const validation = {
  schema: {
    body: {
      type: "object",
      additionalProperties: false,
      required: ["item"],
      properties: {
        item: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          item: { type: "string" },
        },
      },
    },
  },
};

const stack = [];

app.get("/", (req, res) => {
  res.send(stack);
});

// curl --header "Content-Type: application/json" --request POST --data '{"item": "apple"}' http://localhost:5000/post
app.post("/post", validation, (req, res) => {
  const { item } = req.body;
  stack.push(item);
  res.send(stack);
});

app.listen(5000, (err) => {
  console.log(app.routes);

  if (err) {
    console.error({ err });
    process.exit(1);
  } else {
    console.log(`Server running on localhost:5000`);
  }
});
