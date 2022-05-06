package com.kami.study.finalProject.service.exchange;

import com.google.gson.JsonParser;
import com.kami.study.finalProject.model.enums.Currency;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
public class ExchangeService {
    private static final String URL_USD_RUB = "https://v6.exchangerate-api.com/v6/abfa2886f1b77c08e68f39e2/pair/USD/RUB";
    private static final String URL_EUR_RUB = "https://v6.exchangerate-api.com/v6/abfa2886f1b77c08e68f39e2/pair/EUR/RUB";

    public static Double getRate(Currency currency) throws IOException {
        URL url = new URL(prepareURL(currency));
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        return JsonParser.parseReader(new InputStreamReader((InputStream) request.getContent())).getAsJsonObject().get("conversion_rate").getAsDouble();
    }

    private static String prepareURL(Currency currency) {
        return String.format("https://v6.exchangerate-api.com/v6/abfa2886f1b77c08e68f39e2/pair/%s/RUB", currency.name());
    }
}
