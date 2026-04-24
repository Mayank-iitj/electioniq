import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { age, citizenship, country, state } = await req.json();

    const ageNum = parseInt(age, 10);
    const missingRequirements: string[] = [];
    const nextSteps: string[] = [];
    let status: "eligible" | "not-eligible" | "partial" = "eligible";

    if (country === "IN") {
      // India rules
      if (isNaN(ageNum) || ageNum < 18) {
        missingRequirements.push("You must be at least 18 years old.");
        status = "not-eligible";
      }
      if (citizenship !== "indian") {
        missingRequirements.push("You must be an Indian citizen.");
        status = "not-eligible";
      }
      if (!state) {
        missingRequirements.push("You must be an ordinary resident in a constituency.");
        status = status === "eligible" ? "partial" : status;
        nextSteps.push("Select your state to see specific constituency information.");
      }

      if (status === "eligible") {
        nextSteps.push("✅ Visit voters.eci.gov.in to register or check your registration.");
        nextSteps.push("✅ Fill Form 6 if you are not yet registered.");
        nextSteps.push("✅ Keep your Aadhaar, age proof, and address proof ready.");
        if (ageNum >= 18 && ageNum <= 19) {
          nextSteps.push("🎉 Congratulations on being a new voter! India counts on you.");
        }
      } else {
        if (ageNum < 18) {
          const yearsLeft = 18 - ageNum;
          nextSteps.push(`You can register to vote in ${yearsLeft} year${yearsLeft > 1 ? "s" : ""}.`);
          nextSteps.push("Pre-register at some states — check your state election authority.");
        }
        if (citizenship !== "indian") {
          nextSteps.push("Only Indian citizens can vote in Indian elections.");
        }
      }
    } else {
      // USA rules
      if (isNaN(ageNum) || ageNum < 18) {
        missingRequirements.push("You must be at least 18 years old on Election Day.");
        status = "not-eligible";
      }
      if (citizenship !== "us-citizen") {
        missingRequirements.push("You must be a US citizen (by birth or naturalization).");
        status = "not-eligible";
      }
      if (!state) {
        missingRequirements.push("You must be registered in the state where you reside.");
        status = status === "eligible" ? "partial" : status;
        nextSteps.push("Select your state to see specific registration deadlines.");
      }

      if (status === "eligible") {
        nextSteps.push("✅ Visit vote.gov to register or check your registration status.");
        nextSteps.push("✅ Confirm your state's registration deadline (usually 15–30 days before election).");
        nextSteps.push("✅ Check if your state requires a photo ID at the polls.");
        if (ageNum === 17) {
          nextSteps.push("ℹ️ In some states, 17-year-olds can vote in primaries if they'll be 18 by the general election.");
          status = "partial";
        }
      } else {
        if (ageNum < 18) {
          nextSteps.push(`You can register to vote when you turn 18.`);
          nextSteps.push("Pre-register now in many states — check vote.gov.");
        }
      }
    }

    return NextResponse.json({
      status,
      age: ageNum,
      citizenship,
      country,
      state,
      missingRequirements,
      nextSteps,
    });
  } catch (error) {
    console.error("Eligibility API error:", error);
    return NextResponse.json({ error: "Failed to check eligibility" }, { status: 500 });
  }
}
