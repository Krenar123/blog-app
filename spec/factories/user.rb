# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    email { FFaker::Name.name }
  end
end
