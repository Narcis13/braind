const xmlbuilder = require('xmlbuilder');

export default class GeneratorFacturaXML {
    public obj:any 
    private xml:any;
    constructor(obj:any){
        this.obj=obj
    }
    public init():string{
      
       this.xml = xmlbuilder.create('Invoice', {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: true,
          })
          
          .att(  'xmlns', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2')//urn:oasis:names:specification:ubl:schema:xsd:Invoice-2
          .att( 'xmlns:cbc', 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2')
          .att ('xmlns:cac', 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2')//urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2
          .att("xmlns:ns4","urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2")
          .att( "xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance")
          .att("xsi:schemaLocation","urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd")
        // this.xml.ele('cbc:UBLVersionID',"2.1")
          this.xml.ele('cbc:CustomizationID', "urn:cen.eu:en16931:2017#compliant#urn:efactura.mfinante.ro:CIUS-RO:1.0.1");
          this.xml.ele('cbc:ID',this.obj[0].serie+this.obj[0].numar)
          this.xml.ele('cbc:IssueDate',this.obj[0].dataFactura)
          this.xml.ele('cbc:DueDate',this.obj[0].scadenta)
          this.xml.ele('cbc:InvoiceTypeCode','380')
          this.xml.ele('cbc:Note','Nota: '+this.obj[0].mentiuni)
          this.xml.ele('cbc:DocumentCurrencyCode','RON')

          //furnizor
            this.genFurnizor()

          //client
            this.genClient()  

            this.genTaxTotal()

            this.genMonetaryTotal()

            this.genLinii()

          return this.xml.end({ pretty: true });
    }

    private genFurnizor(){

        const furnizor=this.xml.ele('cac:AccountingSupplierParty')
        const party = furnizor.ele('cac:Party')
        party.ele('cac:PartyIdentification').ele('cbc:ID',this.obj[0].codfiscalfurnizor)
        const postal_adress = party.ele('cac:PostalAddress')
        postal_adress.ele('cbc:StreetName',this.obj[0].adresafurnizor)
        postal_adress.ele('cbc:CityName',this.obj[0].orasfurnizor)
        postal_adress.ele('cbc:CountrySubentity',this.obj[0].judetfurnizor)
        const country = postal_adress.ele('cac:Country')
        country.ele('cbc:IdentificationCode','RO')

        const part_tax_scheme=party.ele('cac:PartyTaxScheme')
        part_tax_scheme.ele('cbc:CompanyID',this.obj[0].codfiscalfurnizor)
        part_tax_scheme.ele('cac:TaxScheme')

        const party_legal = party.ele('cac:PartyLegalEntity')
        party_legal.ele('cbc:RegistrationName',this.obj[0].denumirefurnizor)
        party_legal.ele('cbc:CompanyID',this.obj[0].codfiscalfurnizor)
    }

    private genClient(){

      const client=this.xml.ele('cac:AccountingCustomerParty')
      const party = client.ele('cac:Party')

      party.ele('cac:PartyIdentification').ele('cbc:ID',this.obj[0].codfiscalclient)
     // party.ele('cac:PartyName').ele('cbc:Name',this.obj[0].numeclient)

      const postal_adress = party.ele('cac:PostalAddress')
      postal_adress.ele('cbc:StreetName',this.obj[0].adresaclient)
      postal_adress.ele('cbc:CityName',this.obj[0].orasclient)
      postal_adress.ele('cbc:CountrySubentity',"RO-"+this.obj[0].judetclient.split(' - ')[0])
      const country = postal_adress.ele('cac:Country')
      country.ele('cbc:IdentificationCode','RO')

      const part_tax_scheme=party.ele('cac:PartyTaxScheme')
      part_tax_scheme.ele('cbc:CompanyID',this.obj[0].codfiscalclient)
      part_tax_scheme.ele('cac:TaxScheme')

      const party_legal = party.ele('cac:PartyLegalEntity')
      party_legal.ele('cbc:RegistrationName',this.obj[0].numeclient)
      party_legal.ele('cbc:CompanyID',this.obj[0].codfiscalclient)

    }

    private genTaxTotal(){
      let total=0
      this.obj.map(item=>{
          total+=item.valoare
      })
      const taxtotal= this.xml.ele('cac:TaxTotal')
      taxtotal.ele('cbc:TaxAmount',"0.00").att('currencyID','RON')

      const taxsubtotal=taxtotal.ele('cac:TaxSubtotal')
      taxsubtotal.ele('cbc:TaxableAmount',total.toFixed(2).replace('.', '.')).att('currencyID','RON')
      taxsubtotal.ele('cbc:TaxAmount','0.00').att('currencyID','RON')
      const taxcategory = taxsubtotal.ele('cac:TaxCategory')
      taxcategory.ele('cbc:ID','O')
      //taxcategory.ele('cbc:Percent','0.00')
      taxcategory.ele('cbc:TaxExemptionReasonCode','VATEX-EU-O')
      taxcategory.ele('cbc:TaxExemptionReason','Entitatea nu este inregistrata in scopuri de TVA')
      taxcategory.ele('cac:TaxScheme').ele('cbc:ID','VAT')


    }

    private genMonetaryTotal(){
      let total=0
      this.obj.map(item=>{
          total+=item.valoare
      })
      const monetary_total=this.xml.ele('cac:LegalMonetaryTotal')
      monetary_total.ele('cbc:LineExtensionAmount',total.toFixed(2).replace('.', '.')).att('currencyID','RON')
      monetary_total.ele('cbc:TaxExclusiveAmount',total.toFixed(2).replace('.', '.')).att('currencyID','RON')
      monetary_total.ele('cbc:TaxInclusiveAmount',total.toFixed(2).replace('.', '.')).att('currencyID','RON')
      monetary_total.ele('cbc:AllowanceTotalAmount','0').att('currencyID','RON')
     monetary_total.ele('cbc:PrepaidAmount','0.00').att('currencyID','RON')
     // monetary_total.ele('cbc:PayableRoundingAmount','0.00').att('currencyID','RON')
      monetary_total.ele('cbc:PayableAmount',total.toFixed(2).replace('.', '.')).att('currencyID','RON')

    }

    private genLinii(){
      let idx=1
      this.obj.map(item=>{

        let linie = this.xml.ele('cac:InvoiceLine')
        linie.ele('cbc:ID',idx)
      //  linie.ele('cbc:InvoicedQuantity',item.numeprodus+" "+item.descriere).att('unitCode','SCO')
        linie.ele('cbc:InvoicedQuantity',item.cantitate.toFixed(2).replace('.', '.')).att('unitCode',item.um.split(' - ')[0])
        linie.ele('cbc:LineExtensionAmount',item.valoare.toFixed(2).replace('.', '.')).att('currencyID','RON')
        const reper = linie.ele('cac:Item')
        reper.ele('cbc:Name',item.numeprodus+" "+item.descriere)
        const tax_categ=reper.ele('cac:ClassifiedTaxCategory')
        tax_categ.ele('cbc:ID',"O")
        tax_categ.ele('cac:TaxScheme').ele('cbc:ID','VAT')
        const pret = linie.ele('cac:Price')
        pret.ele('cbc:PriceAmount',item.pret.toFixed(2).replace('.', '.')).att('currencyID','RON')

          idx++
      })
    }


}