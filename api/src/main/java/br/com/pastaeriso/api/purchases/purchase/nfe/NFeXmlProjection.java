package br.com.pastaeriso.api.purchases.purchase.nfe;

import org.springframework.data.rest.core.config.Projection;

@Projection(types = { NFeXml.class })
public interface NFeXmlProjection {
	
	public String getAccessCode();
	
}
