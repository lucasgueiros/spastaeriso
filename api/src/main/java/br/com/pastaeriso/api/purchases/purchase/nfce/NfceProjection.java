package br.com.pastaeriso.api.purchases.purchase.nfce;

import br.com.pastaeriso.purchases.purchase.nfce.Nfce;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = { Nfce.class })
public interface NfceProjection {
	
	public String getAccessCode();
	
}
