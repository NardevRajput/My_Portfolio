@PostMapping
public ApiResponse<Contact> saveContact(
        @Valid @RequestBody ContactRequestDTO dto) {

    Contact contact = new Contact();

    contact.setName(dto.getName());
    contact.setEmail(dto.getEmail());
    contact.setMessage(dto.getMessage());

    Contact savedContact = contactRepository.save(contact);

    // TEMPORARY DISABLE
    // excelService.saveToExcel(contact);
    // emailService.sendContactEmail(contact);

    return new ApiResponse<>(
            true,
            "Contact saved successfully",
            savedContact);
}