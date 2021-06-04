/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.people.contact;

import br.com.pastaeriso.people.contact.Contact;
import org.springframework.data.rest.core.config.Projection;

/**
 *
 * @author lucas
 */
@Projection(name = "withChannel", types = Contact.class)
public interface ContactWithChannelProjection {
    public String getName();
    public String getContact();
    //public String getChannel();
}
