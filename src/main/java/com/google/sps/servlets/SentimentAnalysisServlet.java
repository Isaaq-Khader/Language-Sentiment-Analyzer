package com.google.sps.servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;

@WebServlet("/sentiment")
public class SentimentAnalysisServlet extends HttpServlet {


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // This takes the request from the POST body
        String message = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

        // builds our languageService and analyzes our message
        Document doc =
            Document.newBuilder().setContent(message).setType(Document.Type.PLAIN_TEXT).build();
        LanguageServiceClient languageService = LanguageServiceClient.create();
        Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
        
        // gets the score from the sentiment analyzer
        float score = sentiment.getScore();
        languageService.close();


        // Output the sentiment score as HTML.
        response.setContentType("text/html");
        response.getWriter().println(score);
    }

}
