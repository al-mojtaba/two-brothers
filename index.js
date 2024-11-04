const discord_req = (message) => {
  fetch(
    "https://discord.com/api/webhooks/1299133400161980427/AEKsEVSJ3C5OgDzLHQrEb3uuuvY0ujF6s5HV8Xy-8NTwOggIjmlY9VDKOOltHCZZ3EFF",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "```" + message + "```",
      }),
    }
  );
};

tradingData = new Object();

const fetchFun = async (urlname) => {
  const res = await fetch(
    `https://social.xm.com/pubapi/social-trading/v1/s3/strategies/json/${urlname}.json`
  );

  trading = await res.json();
  
  if (trading.positions[0] !== undefined) {
    if (tradingData[`openP-${urlname}`] !== trading.positions[0].id) {
      discord_req(trading.positions[0]);
      tradingData[`openP-${urlname}`] = trading.positions[0].id;
    }
  }

  if(tradingData[`closeP-${urlname}`] !== trading.closedPositions[0].id){

    discord_req(JSON.stringify(trading.closedPositions[0]));
    tradingData[`closeP-${urlname}`] = trading.closedPositions[0].id
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

people = ["vlJZjpl1", "DRw1qola"];
const run = async () => {

  while (true) {
    await delay(1000);
    people.forEach((element) => {
      fetchFun(element);
    });
  }
};

run()
