
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class LandingInfraStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
            domainName: 'jigxo.com',
        });
        const { webBucket, cloudfrontDistribution } = this.createWebSite(hostedZone, 'jigxo.com');

        new cdk.CfnOutput(this, 'WebSiteBucketName', {
            value: webBucket.bucketName,
            description: 'Bucket to deploy web site',
            exportName: 'WebSiteBucketName',
        });
        new cdk.CfnOutput(this, 'WebSiteDistributionId', {
            value: cloudfrontDistribution.distributionId,
            description: 'Cloudfront distribution ID for web site',
            exportName: 'WebSiteDistributionId',
        });
        new cdk.CfnOutput(this, 'WebSiteDistributionDomainName', {
            value: cloudfrontDistribution.domainName,
            description: 'Cloudfront distribution domain name for web site',
            exportName: 'WebSiteDistributionDomainName',
        });

    }

    createWebSite(hostedZone: route53.IHostedZone, webDomainName: string) {
        const cfFunctionRedirectToIndex = new cloudfront.Function(this, 'CFFunctionRedirectToIndex', {
            code: cloudfront.FunctionCode.fromFile({ filePath: 'lib/cf_redirect-to-index.js' }),
        });
        const webProdDomainCertificateResource = new acm.Certificate(this, 'WebSiteCertificate', {
            domainName: webDomainName,
            validation: acm.CertificateValidation.fromDns(hostedZone),
        });
        const webBucket = new s3.Bucket(this, 'WebSiteBucket', {
            bucketName: webDomainName,
            autoDeleteObjects: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        const behaviour: cloudfront.BehaviorOptions = {
            origin: origins.S3BucketOrigin.withOriginAccessControl(webBucket, {
                originAccessLevels: [cloudfront.AccessLevel.READ, cloudfront.AccessLevel.LIST],
            }),
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            functionAssociations: [{
                function: cfFunctionRedirectToIndex,
                eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            }],
        };
        const cloudfrontDistribution = new cloudfront.Distribution(this, 'WebSite', {
            defaultBehavior: behaviour,
            domainNames: [webDomainName],
            certificate: webProdDomainCertificateResource,
            defaultRootObject: 'index.html',
        });
        new route53.ARecord(this, 'WebSiteDnsRecord', {
            zone: hostedZone,
            recordName: webDomainName,
            target: route53.RecordTarget.fromAlias(new route53_targets.CloudFrontTarget(cloudfrontDistribution))
        });
        return { webBucket, cloudfrontDistribution };
    }

}
