var periods = 2;

const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=";
const END_URL = "&apikey=K59WEQJ3XCLUDX75&outputsize=full";

const RSI_URL = "https://www.alphavantage.co/query?function=RSI&symbol=";
const END_RSI = '&interval=monthly&time_period=' + periods + '&series_type=close&apikey=K59WEQJ3XCLUDX75&outputsize=full';

// graph params
var tickerData = [];
var rsiData = [];
var maxY = 0;

export async function getMonthly(ticker) {
  // helper functions below
  await getTickerData(ticker); 
  await getRSIdata(ticker);
  var rsiTrade = tradeRSI();
  console.log(rsiTrade);
  var winRate = Math.floor((rsiTrade.totalWins / rsiTrade.totalBuys) * 100);
  console.log(tickerData);
  return [maxY, tickerData, winRate];
}

async function getTickerData(ticker) {
  const data = await fetch(BASE_URL + ticker + END_URL) 
    .then(res => res.json()); // json
  console.log(data)
  for (const date in data["Monthly Adjusted Time Series"]) { // make array, get max for graph
    let price = data["Monthly Adjusted Time Series"][date]["4. close"]; // get close price
    tickerData.push({ "Year": date.substring(0,4), "Price": price }); // push to array
    if (parseFloat(price) > maxY) { // get max for chart 
      maxY = price;
    }
  }
  tickerData.reverse(); // chronological order
  maxY = Math.ceil(parseFloat(maxY) + 25); // add buffer for chart
}

async function getRSIdata(ticker) {
  const RSIdata = await fetch(RSI_URL + ticker + END_RSI)
    .then(res => res.json());
  console.log(RSIdata)
  for (const date in RSIdata["Technical Analysis: RSI"]) {
    let rsi = RSIdata["Technical Analysis: RSI"][date]["RSI"];
    rsiData.push(rsi);
  }
  rsiData.reverse();
}


function tradeRSI() {
  // stores
  let prevEvent = { 
    "action": "sell",
    "price": 0,
  };
  let positions = {
    "totalBuys": 0,
    "totalWins": 0
  };
  // decision tree
  for(let i = 2; i < tickerData.length; i++){
    let rsi = rsiData[i - periods]; // offset to account for rolling period used to calculate RSI
    let decision = (rsi > 20 && rsi < 80) ?  "wait" : ((rsi < 20) ? "buy" : "sell");

    if (decision === "buy" && prevEvent.action === "sell") {
      let curr_price = tickerData[i].Price;
      tickerData[i]["RSI Buy"] = curr_price;

      positions.totalBuys += 1

      prevEvent.action = "buy";
      prevEvent.price = curr_price;
    }

    if (decision === "sell" && prevEvent.action === "buy") {
      let curr_price = tickerData[i].Price;
      tickerData[i]["RSI Sell"] = curr_price;
  
      if (curr_price > prevEvent.price) {
        positions.totalWins += 1;
      }
      prevEvent.action = "sell";
      prevEvent.price = curr_price;
    }
  }

  return positions;
}