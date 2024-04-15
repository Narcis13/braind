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
          
          .att(  'xmlns', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2')
          .att( 'xmlns:cbc', 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2')
          .att ('xmlns:cac', 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2')
          .att("xmlns:ns4","urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2")
          .att( "xmlns:xs","http://www.w3.org/2001/XMLSchema-instance")
          .att("xsi:schemaLocation","urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd")

          this.xml.ele('cbc:CustomizationID', "urn:cen.eu:en16931:2017#compliant#urn:efactura.mfinante.ro:CIUS-RO:1.0.1");
          this.xml.ele('cbc:ID',this.obj[0].serie+this.obj[0].numar)
          this.xml.ele('cbc:IssueDate',this.obj[0].dataFactura)
          this.xml.ele('cbc:DueDate',this.obj[0].scadenta)
          this.xml.ele('cbc:InvoiceTypeCode','380')
          this.xml.ele('cbc:Note','Comentariu:')
          this.xml.ele('cbc:DocumentCurrencyCode','RON')

          //furnizor
            this.genFurnizor()

          //client
            this.genClient()  

          return this.xml.end({ pretty: true });
    }

    private genFurnizor(){

        const furnizor=this.xml.ele('cac:AccountingSupplierParty')
        const party = furnizor.ele('cac:Party')
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
      const postal_adress = party.ele('cac:PostalAddress')
      postal_adress.ele('cbc:StreetName',this.obj[0].adresaclient)
      postal_adress.ele('cbc:CityName',this.obj[0].orasclient)
      postal_adress.ele('cbc:CountrySubentity',this.obj[0].judetclient)
      const country = postal_adress.ele('cac:Country')
      country.ele('cbc:IdentificationCode','RO')

      const part_tax_scheme=party.ele('cac:PartyTaxScheme')
      part_tax_scheme.ele('cbc:CompanyID',this.obj[0].codfiscalclient)
      part_tax_scheme.ele('cac:TaxScheme')

      const party_legal = party.ele('cac:PartyLegalEntity')
      party_legal.ele('cbc:RegistrationName',this.obj[0].numeclient)
      party_legal.ele('cbc:CompanyID',this.obj[0].codfiscalclient)

    }


}