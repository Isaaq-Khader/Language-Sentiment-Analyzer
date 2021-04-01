package com.google.sps.servlets;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import java.util.stream.Collectors;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/translator")
public class TranslateServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get user input.
    String userInput = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
    //For now the langCode is just english
    //String langCode = request.getParameter("languageCode");

    // Translate user text
    Translate translate = TranslateOptions.getDefaultInstance().getService();
    Translation translation = translate.translate(userInput, Translate.TranslateOption.targetLanguage("en"),Translate.TranslateOption.format("text")); 
    
    String translatedText = translation.getTranslatedText();

    // Prints translation.
    response.setContentType("text/plain; charset=UTF-8");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().println(translatedText);
  }
}
//  :) 