import 'package:flutter/material.dart';
import 'package:programmer_2003/constants/size.dart';
import 'package:programmer_2003/constants/sns_links.dart';

import '../constants/colors.dart';
import 'custom_text_field.dart';

import 'dart:js' as js;

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(25, 20, 25, 60),
      child: Column(
        children: [
          // ! title
          Text(
            'Get in touch',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 24,
              color: CustomColor.whitePrimary,
            ),
          ),

          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 800),
            child: Divider(),
          ),

          SizedBox(height: 15),

          // ! SNS icon button links
          Wrap(
            spacing: 6,
            runSpacing: 6,
            alignment: WrapAlignment.center,
            children: [
              InkWell(
                onTap: () {
                  js.context.callMethod('open', [SnsLinks.instagram]);
                },
                child: Image.asset(
                  'assets/instagram.png',
                  color: Colors.white,
                  width: 30,
                ),
              ),
              InkWell(
                onTap: () {
                  js.context.callMethod('open', [SnsLinks.telegram]);
                },
                child: Image.asset(
                  'assets/telegram.png',
                  color: Colors.white,
                  width: 30,
                ),
              ),
              InkWell(
                onTap: () {
                  js.context.callMethod('open', [SnsLinks.linkedin]);
                },
                child: Image.asset(
                  'assets/linkedin.png',
                  color: Colors.white,
                  width: 30,
                ),
              ),
              InkWell(
                onTap: () {
                  js.context.callMethod('open', [SnsLinks.github]);
                },
                child: Image.asset(
                  'assets/github.png',
                  color: Colors.white,
                  width: 30,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Row buildNameEmailFieldDesktop() {
    return Row(
      children: [
        Flexible(
          // ! name
          child: CustomTextField(
            hintText: 'Your name',
          ),
        ),

        // ! email
        SizedBox(width: 15),
        Flexible(
          child: CustomTextField(
            hintText: 'Your email',
          ),
        ),
      ],
    );
  }

  Column buildNameEmailFieldMobile() {
    return Column(
      children: [
        Flexible(
          // ! name
          child: CustomTextField(
            hintText: 'Your name',
          ),
        ),

        // ! email
        SizedBox(height: 15),
        Flexible(
          child: CustomTextField(
            hintText: 'Your email',
          ),
        ),
      ],
    );
  }
}
