import crypto from "crypto";

const createHeaders = () => {
  const token = process.env.SWITCHBOT_TOKEN;
  const secret = process.env.SWITCHBOT_SECRET;
  const t = Date.now();
  const nonce = "requestID";
  const data = token + t + nonce;
  const signTerm = crypto
    .createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest();
  const sign = signTerm.toString("base64");

  return {
    Authorization: token,
    sign: sign,
    nonce: nonce,
    t: t,
  };
};

export const get = (path, queries) => {
  return fetch(
    `https://api.switch-bot.com/v1.1${path}?${new URLSearchParams(
      queries
    ).toString()}`,
    {
      headers: createHeaders(),
    }
  ).then((res) => res.json());
};

export const post = (path, data) => {
  const body = JSON.stringify(data);
  return fetch(`https://api.switch-bot.com/v1.1${path}`, {
    method: "POST",
    headers: createHeaders(),
    body,
  }).then((res) => res.json());
};
