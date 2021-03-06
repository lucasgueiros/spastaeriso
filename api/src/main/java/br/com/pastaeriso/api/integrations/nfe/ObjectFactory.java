/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.com.pastaeriso.api.integrations.nfe;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the br.com.pastaeriso.api.integrations.nfe package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _NfeProcErro_QNAME = new QName("http://www.portalfiscal.inf.br/nfe", "erro");
    private final static QName _NfeProcProc_QNAME = new QName("http://www.portalfiscal.inf.br/nfe", "proc");
    private final static QName _NfeProcUrlConsulta_QNAME = new QName("http://www.portalfiscal.inf.br/nfe", "urlConsulta");
    private final static QName _NfeProcDataHora_QNAME = new QName("http://www.portalfiscal.inf.br/nfe", "dataHora");
    private final static QName _NfeProcConsulta_QNAME = new QName("http://www.portalfiscal.inf.br/nfe", "consulta");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: br.com.pastaeriso.api.integrations.nfe
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSAliq }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSAliq createNfeProcProcNfeProcNFeInfNFeDetImpostoCOFINSCOFINSAliq() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSAliq();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc createNfeProcProcNfeProc() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit.EnderEmit }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit.EnderEmit createNfeProcProcNfeProcNFeInfNFeEmitEnderEmit() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit.EnderEmit();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe.InfProt }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe.InfProt createNfeProcProcNfeProcProtNFeInfProt() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe.InfProt();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc createNfeProcProc() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total createNfeProcProcNfeProcNFeInfNFeTotal() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det createNfeProcProcNfeProcNFeInfNFeDet() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag createNfeProcProcNfeProcNFeInfNFePagDetPag() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.CanonicalizationMethod }
     * 
     */
    public Signature.SignedInfo.CanonicalizationMethod createSignatureSignedInfoCanonicalizationMethod() {
        return new Signature.SignedInfo.CanonicalizationMethod();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.Reference.Transforms.Transform }
     * 
     */
    public Signature.SignedInfo.Reference.Transforms.Transform createSignatureSignedInfoReferenceTransformsTransform() {
        return new Signature.SignedInfo.Reference.Transforms.Transform();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Prod }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Prod createNfeProcProcNfeProcNFeInfNFeDetProd() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Prod();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS createNfeProcProcNfeProcNFeInfNFeDetImpostoCOFINS() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS createNfeProcProcNfeProcNFeInfNFeDetImpostoICMS() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Ide }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Ide createNfeProcProcNfeProcNFeInfNFeIde() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Ide();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfAdic }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfAdic createNfeProcProcNfeProcNFeInfNFeInfAdic() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfAdic();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.Reference.Transforms }
     * 
     */
    public Signature.SignedInfo.Reference.Transforms createSignatureSignedInfoReferenceTransforms() {
        return new Signature.SignedInfo.Reference.Transforms();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe createNfeProcProcNfeProcNFe() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFeSupl }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFeSupl createNfeProcProcNfeProcNFeInfNFeSupl() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFeSupl();
    }

    /**
     * Create an instance of {@link Signature }
     * 
     */
    public Signature createSignature() {
        return new Signature();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfRespTec }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfRespTec createNfeProcProcNfeProcNFeInfNFeInfRespTec() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.InfRespTec();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe createNfeProcProcNfeProcNFeInfNFe() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.SignatureMethod }
     * 
     */
    public Signature.SignedInfo.SignatureMethod createSignatureSignedInfoSignatureMethod() {
        return new Signature.SignedInfo.SignatureMethod();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc createNfeProc() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo }
     * 
     */
    public Signature.SignedInfo createSignatureSignedInfo() {
        return new Signature.SignedInfo();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.Reference.DigestMethod }
     * 
     */
    public Signature.SignedInfo.Reference.DigestMethod createSignatureSignedInfoReferenceDigestMethod() {
        return new Signature.SignedInfo.Reference.DigestMethod();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag createNfeProcProcNfeProcNFeInfNFePag() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit createNfeProcProcNfeProcNFeInfNFeEmit() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag.Card }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag.Card createNfeProcProcNfeProcNFeInfNFePagDetPagCard() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Pag.DetPag.Card();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total.ICMSTot }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total.ICMSTot createNfeProcProcNfeProcNFeInfNFeTotalICMSTot() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Total.ICMSTot();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS00 }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS00 createNfeProcProcNfeProcNFeInfNFeDetImpostoICMSICMS00() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS00();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Transp }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Transp createNfeProcProcNfeProcNFeInfNFeTransp() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Transp();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSNT }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSNT createNfeProcProcNfeProcNFeInfNFeDetImpostoCOFINSCOFINSNT() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.COFINS.COFINSNT();
    }

    /**
     * Create an instance of {@link Signature.KeyInfo }
     * 
     */
    public Signature.KeyInfo createSignatureKeyInfo() {
        return new Signature.KeyInfo();
    }

    /**
     * Create an instance of {@link Signature.SignedInfo.Reference }
     * 
     */
    public Signature.SignedInfo.Reference createSignatureSignedInfoReference() {
        return new Signature.SignedInfo.Reference();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS40 }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS40 createNfeProcProcNfeProcNFeInfNFeDetImpostoICMSICMS40() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.ICMS.ICMS40();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISNT }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISNT createNfeProcProcNfeProcNFeInfNFeDetImpostoPISPISNT() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISNT();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe createNfeProcProcNfeProcProtNFe() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.ProtNFe();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS createNfeProcProcNfeProcNFeInfNFeDetImpostoPIS() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS();
    }

    /**
     * Create an instance of {@link Signature.KeyInfo.X509Data }
     * 
     */
    public Signature.KeyInfo.X509Data createSignatureKeyInfoX509Data() {
        return new Signature.KeyInfo.X509Data();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISAliq }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISAliq createNfeProcProcNfeProcNFeInfNFeDetImpostoPISPISAliq() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto.PIS.PISAliq();
    }

    /**
     * Create an instance of {@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto }
     * 
     */
    public br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto createNfeProcProcNfeProcNFeInfNFeDetImposto() {
        return new br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det.Imposto();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Object }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.portalfiscal.inf.br/nfe", name = "erro", scope = br.com.pastaeriso.api.integrations.nfe.NfeProc.class)
    public JAXBElement<Object> createNfeProcErro(Object value) {
        return new JAXBElement<Object>(_NfeProcErro_QNAME, Object.class, br.com.pastaeriso.api.integrations.nfe.NfeProc.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.portalfiscal.inf.br/nfe", name = "proc", scope = br.com.pastaeriso.api.integrations.nfe.NfeProc.class)
    public JAXBElement<br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc> createNfeProcProc(br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc value) {
        return new JAXBElement<br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc>(_NfeProcProc_QNAME, br.com.pastaeriso.api.integrations.nfe.NfeProc.Proc.class, br.com.pastaeriso.api.integrations.nfe.NfeProc.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.portalfiscal.inf.br/nfe", name = "urlConsulta", scope = br.com.pastaeriso.api.integrations.nfe.NfeProc.class)
    public JAXBElement<String> createNfeProcUrlConsulta(String value) {
        return new JAXBElement<String>(_NfeProcUrlConsulta_QNAME, String.class, br.com.pastaeriso.api.integrations.nfe.NfeProc.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.portalfiscal.inf.br/nfe", name = "dataHora", scope = br.com.pastaeriso.api.integrations.nfe.NfeProc.class)
    public JAXBElement<String> createNfeProcDataHora(String value) {
        return new JAXBElement<String>(_NfeProcDataHora_QNAME, String.class, br.com.pastaeriso.api.integrations.nfe.NfeProc.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.portalfiscal.inf.br/nfe", name = "consulta", scope = br.com.pastaeriso.api.integrations.nfe.NfeProc.class)
    public JAXBElement<String> createNfeProcConsulta(String value) {
        return new JAXBElement<String>(_NfeProcConsulta_QNAME, String.class, br.com.pastaeriso.api.integrations.nfe.NfeProc.class, value);
    }

}
