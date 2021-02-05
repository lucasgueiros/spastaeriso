package br.com.pastaeriso.api.purchases.purchase.nfe;

import br.com.pastaeriso.purchases.purchase.nfe.NFeXml;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = { NFeXml.class })
public interface NFeXmlProjection {
	
	public String getAccessCode();
	
}
