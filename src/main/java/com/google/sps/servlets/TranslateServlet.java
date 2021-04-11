package com.google.sps.servlets;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import java.util.stream.Collectors;
import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;
import com.google.sps.data.WhatsYourSentiment;


@WebServlet("/translator")
public class TranslateServlet extends HttpServlet {

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Get user input.
		String requestParameters = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        String userInputJsonString = convertToJson(requestParameters);
        System.out.println(userInputJsonString);

		// convert to WhatsYourSentiment object 
        WhatsYourSentiment userInputObject = convertFromJson(userInputJsonString);
		 
		// Gets source languge from dropdown
		String sourceLanguage;
        if (userInputObject.getSourceLanguage() == "en") {
            sourceLanguage = "";
        } else {
            sourceLanguage = userInputObject.getSourceLanguage();
        }
		String userInput = userInputObject.getData();
		System.out.println(sourceLanguage);
        System.out.println(userInput);


        String translatedText;
		// Translate user text
		Translate translate = TranslateOptions.getDefaultInstance().getService();
		Translation translation = translate.translate(userInput, Translate.TranslateOption.sourceLanguage(sourceLanguage), Translate.TranslateOption.targetLanguage("en"),Translate.TranslateOption.format("text")); 
		
		translatedText = translation.getTranslatedText();

		// Prints translation.
		response.setContentType("text/plain; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().println(translatedText);
	}

	private static String convertToJson(String a) {
        String res = "{\"";

        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) == '=') {
                res += "\"" + ":" + "\"";
            } else if (a.charAt(i) == '&') {
                res += "\"" + "," + "\"";
            } else if (a.charAt(i) == '+'){
                res += " ";
            }else {
                res += a.charAt(i);
            }
        }
        res += "\"" + "}";
        return res;
    }
    
    private WhatsYourSentiment convertFromJson(String userInput){
        Gson gson = new Gson();
        WhatsYourSentiment userInputObject  = gson.fromJson(userInput, WhatsYourSentiment.class);
        return userInputObject;

    }


}

//  :) 
