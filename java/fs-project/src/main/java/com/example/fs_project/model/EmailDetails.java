package com.example.fs_project.model;

public class EmailDetails {
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;


     public EmailDetails() {}
    public EmailDetails(String attachment, String msgBody, String recipient, String subject) {
        this.attachment = attachment;
        this.msgBody = msgBody;
        this.recipient = recipient;
        this.subject = subject;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
