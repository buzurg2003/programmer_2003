import 'package:flutter/material.dart';

import '../constants/colors.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController? controller;
  final String? hintText;
  final int maxLines;

  const CustomTextField({
    this.controller,
    this.hintText,
    this.maxLines = 1,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      maxLines: maxLines,
      cursorColor: CustomColor.hintDark,
      style: TextStyle(
          color: CustomColor.scaffoldBg
      ),
      decoration: InputDecoration(
          contentPadding: EdgeInsets.all(16),
          filled: true,
          fillColor: CustomColor.whiteSecondary,
          focusedBorder: getInputBorder,
          enabledBorder: getInputBorder,
          border: getInputBorder,
          hintText: hintText,
          hintStyle: TextStyle(
              color: CustomColor.hintDark
          )
      ),
    );
  }

  OutlineInputBorder get getInputBorder {
    return OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide.none
    );
  }
}
