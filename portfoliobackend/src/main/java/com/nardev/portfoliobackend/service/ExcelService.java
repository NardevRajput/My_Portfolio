package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Contact;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.time.LocalDateTime;

@Service
public class ExcelService {

    private static final String FILE_NAME = "G:/portFolio_Data/contacts.xlsx";

    public void saveToExcel(Contact contact) {

        try {

            Workbook workbook;
            Sheet sheet;

            File file = new File(FILE_NAME);

            if (file.exists()) {

                FileInputStream fis = new FileInputStream(file);

                workbook = WorkbookFactory.create(fis);

                sheet = workbook.getSheetAt(0);

            } else {

                workbook = new XSSFWorkbook();

                sheet = workbook.createSheet("Contacts");

                Row header = sheet.createRow(0);

                header.createCell(0).setCellValue("Name");
                header.createCell(1).setCellValue("Email");
                header.createCell(2).setCellValue("Message");
                header.createCell(3).setCellValue("Time");
            }

            int lastRow = sheet.getLastRowNum() + 1;

            Row row = sheet.createRow(lastRow);

            row.createCell(0).setCellValue(contact.getName());
            row.createCell(1).setCellValue(contact.getEmail());
            row.createCell(2).setCellValue(contact.getMessage());
            row.createCell(3).setCellValue(LocalDateTime.now().toString());

            FileOutputStream fos = new FileOutputStream(FILE_NAME);

            workbook.write(fos);

            fos.close();

            workbook.close();

            System.out.println("Excel updated successfully");

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}