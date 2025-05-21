
pool.connect((error, client, release) => {
  if (error) return console.error("Error acquiring client", error.stack);
  client.query("SELECT NOW()", (err, res) => {
    release();
    if (err) return console.error("Error ececuting query", err.stack);
    console.log("Connected to Database", res.rows);
  });
});
