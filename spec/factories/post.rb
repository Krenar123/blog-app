# frozen_string_literal: true

FactoryGirl.define do
  factory :post do
    content { FFaker::Lorem.paragraph }
    user
  end
end
